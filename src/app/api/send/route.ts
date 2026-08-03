import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const { nome, telefone, email, mensagem } = await request.json();

    if (!nome || !email || !mensagem) {
      return Response.json(
        { error: 'Nome, e-mail e mensagem são obrigatórios.' },
        { status: 400 }
      );
    }

    if (!resendApiKey) {
      console.error('RESEND_API_KEY não configurada.');
      return Response.json(
        { error: 'O serviço de e-mail não está configurado. Defina RESEND_API_KEY no ambiente.' },
        { status: 500 }
      );
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
    const toEmail = process.env.CONTACT_TO_EMAIL ?? 'contato@ipseg.com.br';

    const { data, error } = await resend!.emails.send({
      from: `IPSEG <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `Novo contato pelo site — ${nome}`,
      react: EmailTemplate({ nome, telefone, email, mensagem }),
    });

    if (error) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'object' && error !== null && 'message' in error
            ? String((error as { message?: unknown }).message)
            : 'Erro ao enviar o e-mail.';

      console.error('Resend API Error:', error);
      return Response.json({ error: message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao processar o formulário.';
    console.error(message);
    return Response.json({ error: message }, { status: 500 });
  }
}