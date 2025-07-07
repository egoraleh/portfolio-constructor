const getAllStyles = () => {
    let styles = '';

    document.head.querySelectorAll('style, link[rel="stylesheet"]').forEach((tag) => {
        styles += tag.outerHTML;
    });

    return styles;
};

const downloadPortfolio = () => {
    const portfolioContainer = document.querySelector('#app');

    if (!portfolioContainer) {
        console.error('Ошибка при скачивании, попробуйте позже!');
        return;
    }

    const exportContent = portfolioContainer.cloneNode(true) as HTMLElement;

    const mainHeader = exportContent.querySelector('.main__header');
    if (mainHeader) {
        mainHeader.textContent = 'Моё портфолио';
    }

    exportContent.querySelectorAll('[data-ignore-export]').forEach((el) => el.remove());

    const dynamicStyles = getAllStyles();

    const fullHtml = `
    <html lang="ru">
      <head>
        <meta charset="utf-8">
        <title>Моё портфолио</title>
        ${dynamicStyles}
      </head>
      <body>
        ${exportContent.outerHTML}
      </body>
    </html>
  `;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'portfolio.html';
    link.click();
};

export { downloadPortfolio };
