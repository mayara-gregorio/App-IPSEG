interface EmailTemplateProps {
  nome: string;
  telefone?: string;
  email: string;
  mensagem: string;
}

export function EmailTemplate({ nome, telefone, email, mensagem }: EmailTemplateProps) {
  return (
    <div>
      <h2>Novo contato via site IPSEG</h2>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Telefone:</strong> {telefone || 'não informado'}</p>
      <p><strong>E-mail:</strong> {email}</p>
      <p><strong>Mensagem:</strong></p>
      <p>{mensagem}</p>
    </div>
  );
}