# Newsletter Email Template - Yellow Visa

Template de email marketing/newsletter baseado no design do Figma, otimizado para máxima compatibilidade com clientes de email.

## 📁 Arquivos

- **`newsletter-email.html`** - Versão principal (550px) - otimizado para todos os dispositivos
- **`newsletter-email-desktop.html`** - Versão desktop (600px) - opcional para layouts mais largos

## 🎨 Design

O template foi criado pixel perfect baseado no design do Figma:
- **Fonte principal**: Red Hat Display (títulos) e Red Hat Text (textos)
- **Cores**:
  - Background: `#f7f5f6`
  - Texto: `#0f0005`
  - Primário (amarelo): `#ffbd1a`
  - Primário (vermelho/rosa): `#cc0044`

## 📐 Especificações Técnicas

### Estrutura
- Tabelas HTML tradicionais para máxima compatibilidade
- CSS inline
- Compatível com Outlook, Gmail, Apple Mail, Yahoo Mail
- Suporte para modo escuro desabilitado (cores fixas)

### Dimensões
- **Principal (newsletter-email.html)**: 550px de largura
- **Desktop (newsletter-email-desktop.html)**: 600px de largura
- Header: 80px altura
- Foto principal: 200px altura (550px) / 320px (600px)
- Content padding lateral: 50px
- Footer padding lateral: 96px

### Tipografia
- **Título H1**: 42px/48px line-height, letter-spacing -0.5px, font-weight 400
- **Parágrafos**: 18px/24px line-height, letter-spacing 0, font-weight 400
- **Footer company name**: 18px/24px line-height, font-weight 700
- **Footer endereço**: 18px/24px line-height, font-weight 400
- **Botão CTA**: 16px/20px line-height, font-weight 700, letter-spacing -0.5px

### Espaçamentos
- Título: padding-top 80px, padding-bottom 40px
- Entre parágrafos: 16px
- Antes do botão CTA: 24px
- Footer logo: padding-bottom 24px
- Footer social icons: spacing 8px entre ícones

## 🔧 Como Usar

### 1. Personalização do Conteúdo

#### Substituir o nome do destinatário:
```html
<h1>Olá [Nome], tudo bem?</h1>
```

#### Alterar o link do botão CTA:
```html
<a href="#" target="_blank">Entrar em contato</a>
```
Substitua `#` pela URL desejada (ex: portal do cliente, página de contato, etc.)

#### Atualizar links de redes sociais:
```html
<!-- Facebook -->
<a href="https://facebook.com/yellowvisa" target="_blank">

<!-- Instagram -->
<a href="https://instagram.com/yellowvisa" target="_blank">

<!-- LinkedIn -->
<a href="https://linkedin.com/company/yellowvisa" target="_blank">
```

### 2. Substituição de Imagens

As imagens atualmente usam URLs temporárias do Figma (válidas por 7 dias). **IMPORTANTE**: Substitua pelas imagens hospedadas permanentemente.

#### Imagens necessárias:

1. **Logo Yellow Visa** (Header)
   - Mobile: 184x28px
   - Desktop: 230x35px
   ```html
   src="https://www.figma.com/api/mcp/asset/0c069ca0-97fc-4777-9272-9a45ad04699e"
   ```

2. **Foto Principal** (Hero)
   - Principal: 550x200px
   - Desktop: 600x320px
   ```html
   src="https://www.figma.com/api/mcp/asset/b3b18baf-2baf-445c-8a0a-f506cd39e06d"
   ```

3. **Logo Symbol** (Footer)
   - Mobile: 62x56px
   - Desktop: 80x72px
   ```html
   src="https://www.figma.com/api/mcp/asset/49b0292f-528e-4784-8d25-7e6686a98fb6"
   ```

4. **Ícones Sociais**:
   - Facebook: `src="https://www.figma.com/api/mcp/asset/3e7c4af3-498b-4fe4-a82c-eea472d597fc"`
   - Instagram: `src="https://www.figma.com/api/mcp/asset/af0c04d7-27f8-4b5b-8b2e-31f6386a8ad1"`
   - LinkedIn: `src="https://www.figma.com/api/mcp/asset/7e0b4051-d0b3-4936-8034-8dd74499677d"`

#### Como hospedar imagens:
- Use CDN da empresa ou serviço de hospedagem de imagens
- Certifique-se que as URLs são HTTPS
- Recomendado: otimizar imagens (compressão, formato WebP com fallback JPEG)

### 3. Testes Recomendados

Teste o email em diferentes clientes:
- ✅ Gmail (web, iOS, Android)
- ✅ Outlook (desktop, web, iOS, Android)
- ✅ Apple Mail (macOS, iOS)
- ✅ Yahoo Mail
- ✅ Thunderbird

#### Ferramentas de teste:
- [Litmus](https://litmus.com)
- [Email on Acid](https://www.emailonacid.com)
- [Mailtrap](https://mailtrap.io)

### 4. Envio

#### Opções de serviço de email:
- **SendGrid**
- **Mailchimp**
- **Amazon SES**
- **Mailgun**
- **Postmark**

#### Dicas importantes:
- Use merge tags do seu serviço para personalização (ex: `{{first_name}}`)
- Configure SPF, DKIM e DMARC para melhor deliverability
- Sempre inclua versão plain text como fallback
- Adicione link de unsubscribe (obrigatório por lei)

## 📝 Alterações de Conteúdo

### Texto dos Parágrafos

Todos os parágrafos podem ser editados diretamente no HTML. Mantenha a estrutura de `<p>` tags para preservar o espaçamento correto:

```html
<p style="margin: 0; font-family: 'Red Hat Text', Arial, Helvetica, sans-serif; font-size: 20px; line-height: 28px; letter-spacing: 0px; color: #0f0005; font-weight: 400;">
  Seu texto aqui
</p>
```

## ⚠️ Avisos Importantes

1. **Imagens do Figma expiram em 7 dias** - substitua ANTES de enviar
2. **Teste em múltiplos clientes** - especialmente Outlook
3. **Valide HTML** - use [W3C Validator](https://validator.w3.org/)
4. **Inclua link de unsubscribe** - requisito legal
5. **Adicione preheader text** - para melhor preview em caixas de entrada

## 🔍 Checklist Pré-Envio

- [ ] Substituir todas as imagens temporárias por URLs permanentes
- [ ] Atualizar placeholder `[Nome]` com merge tag do serviço
- [ ] Configurar URL do botão CTA
- [ ] Verificar links de redes sociais
- [ ] Adicionar link de unsubscribe
- [ ] Testar em Gmail, Outlook e Apple Mail
- [ ] Validar HTML
- [ ] Revisar ortografia e gramática
- [ ] Fazer teste de envio para email pessoal

## 📞 Suporte

Para dúvidas sobre o template, consulte:
- Documentação do projeto: `DOCUMENTATION.md`
- Design no Figma: [Link do Figma](https://www.figma.com/design/8IdFMNOHL8Fdqi9vLqm0Tm/-YV--brandguide?node-id=367-1187&m=dev)

---

**Criado com base no design pixel perfect do Figma - Yellow Visa**

