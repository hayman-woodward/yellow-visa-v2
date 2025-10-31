1# 📧 Email Templates - Yellow Visa

Repositório de templates de email para campanhas de marketing e emails transacionais.

## 📁 Estrutura

```
emails/
├─ campaigns/          # Campanhas de marketing
│  └─ YYYY-MM-nome/   # Organizados por data
├─ transactional/     # Emails automáticos (welcome, reset, etc)
└─ templates/         # Templates base e componentes
```

## 🚀 Como usar

### Para MailChimp:
1. Abra o arquivo `.html` da campanha
2. Copie todo o conteúdo
3. No MailChimp: Create → Email → Paste in code
4. Cole o HTML
5. Teste enviando pra você mesmo
6. Envie a campanha

### Para outros ESPs (Brevo, SendGrid, etc):
Mesmo processo - copiar HTML e colar no editor de código.

## ✅ Checklist antes de enviar

- [ ] Testou em Gmail, Outlook, Apple Mail
- [ ] Links estão funcionando
- [ ] Imagens carregando (URLs absolutas)
- [ ] Texto alternativo nas imagens
- [ ] Botão de unsubscribe presente
- [ ] Preview text configurado
- [ ] Mobile responsive

## 🎨 Guidelines

### Cores principais:
- Amarelo: `#FFBD1A`
- Rosa/CTA: `#E91E63`
- Preto: `#000000`
- Cinza escuro: `#1a1a1a`

### Fontes:
- Principal: Arial, Helvetica, sans-serif
- Bold: 'Arial Black' para títulos grandes

### Largura:
- Max width: 600px (padrão email)
- Mobile: 100% com padding

## 📊 Tracking

Sempre adicionar UTMs nos links:
```
?utm_source=email&utm_medium=newsletter&utm_campaign=yellow-friday-2025
```

## 🔗 Links úteis

- [MailChimp Merge Tags](https://mailchimp.com/help/all-the-merge-tags-cheat-sheet/)
- [Email on Acid](https://www.emailonacid.com/) - Testar compatibilidade
- [Can I Email](https://www.caniemail.com/) - Suporte CSS em emails

---

Dúvidas? Fala com @rafael

