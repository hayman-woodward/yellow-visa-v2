# Footer - Especificações de Design

## 🎨 Cores

- **Background**: `#FFBD1A` (amarelo principal)
- **Gradiente overlay**: `linear-gradient(51.58deg, rgba(255, 103, 0, 0.4) 2.15%, rgba(255, 103, 0, 0) 63.41%)`
- **Texto**: `#0f0005` (preto quase total)
- **Botões sociais**: `#CC0044` (rosa/vermelho)
- **Ícones sociais**: `#F7F5F6` (branco off-white)

## 📐 Dimensões

### Container:
- **Padding**: `40px 45px` (top/bottom left/right)
- **Align**: center

### Logo:
- **Width**: `62px`
- **Height**: `56px`
- **Margin bottom**: `24px`

### Botões Sociais:
- **Size**: `46px x 46px`
- **Border radius**: `999px` (circular)
- **Padding**: `14px`
- **Gap entre botões**: `8px` (4px cada lado)
- **Icon size**: `18px x 18px`

## 🔤 Tipografia

### Company Name (YELLOW VISA PLLC):
- **Font family**: 'Red Hat Text', Arial, Helvetica, sans-serif
- **Font size**: `20px`
- **Line height**: `28px`
- **Font weight**: `700` (bold)
- **Color**: `#0f0005`
- **Margin bottom**: `8px`

### Address Text:
- **Font family**: 'Red Hat Text', Arial, Helvetica, sans-serif
- **Font size**: `16px`
- **Line height**: `22px`
- **Font weight**: `400` (regular)
- **Color**: `#0f0005`
- **Margin bottom**: `24px`

## 📱 Conteúdo

### Endereço:
```
1717 K St NW Suite 905
Washington DC - 20006
hello@yellowvisa.com
```

### Links Sociais:
1. **Instagram**: https://instagram.com/yellowvisabr
2. **YouTube**: https://youtube.com/@yellowvisabr
3. **LinkedIn**: https://linkedin.com/company/yellowvisa

## 📦 Assets

### Logo:
- URL: `https://yellowvisa.com/svgs/logo-yv-black.svg`

### Ícones Sociais (Figma MCP - 7 dias):
- Instagram: `https://www.figma.com/api/mcp/asset/6b0b82e5-e492-46f0-acce-4d112c1c69e4`
- Facebook: `https://www.figma.com/api/mcp/asset/7ba4afaf-cb69-4741-8d26-727f30db5e3c`
- LinkedIn: `https://www.figma.com/api/mcp/asset/6878357a-1584-45e1-b436-89dc0268e135`

⚠️ **IMPORTANTE**: Assets do Figma MCP expiram em 7 dias. Substituir por ícones permanentes antes de usar em produção!

## 🔄 Alternativas para Ícones (permanentes):

### Opção 1: SVG Inline
Converter SVG dos ícones e usar inline no HTML.

### Opção 2: Hospedar no site
Fazer upload dos ícones em `public/svgs/icons/` e usar:
- `https://yellowvisa.com/svgs/icons/instagram-white.svg`
- `https://yellowvisa.com/svgs/icons/facebook-white.svg`
- `https://yellowvisa.com/svgs/icons/linkedin-white.svg`

### Opção 3: Unicode/Emoji (fallback)
- Instagram: `📷` ou uso de font-awesome
- YouTube: `▶️`
- LinkedIn: `💼`

## ✅ Checklist de compatibilidade

- [x] Usa tabelas para layout (compatível com Outlook)
- [x] Inline styles (não usa classes CSS)
- [x] Border-radius funciona na maioria dos clients
- [x] Gradiente pode não funcionar em Outlook (fallback: cor sólida)
- [x] Imagens têm alt text
- [x] Links têm target="_blank"

## 🎯 Nota de Design

Footer segue o design system da Yellow Visa com:
- Fundo amarelo característico com gradiente sutil laranja
- Rosa (#CC0044) como cor de destaque/ação
- Tipografia Red Hat Text (fallback Arial)
- Botões circulares para social media
- Alinhamento centralizado

