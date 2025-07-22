(() => {
  // Create a theme selector dropdown
  const themes = ['original', 'dark', 'flattop']; // match your generated themes
  const select = document.createElement('select');
  select.id = 'theme-switcher';
  select.style.position = 'fixed';
  select.style.top = '10px';
  select.style.right = '10px';
  select.style.zIndex = '9999';

  themes.forEach((theme) => {
    const option = document.createElement('option');
    option.value = theme;
    option.text = theme.charAt(0).toUpperCase() + theme.slice(1);
    select.appendChild(option);
  });

  // Append the dropdown to body
  document.body.appendChild(select);

  // Function to load the CSS file for a theme
  function loadThemeCss(themeName) {
    // Remove existing theme <link> if any
    const oldLink = document.getElementById('swagger-theme-css');
    if (oldLink) oldLink.remove();

    // Create new <link> element
    const link = document.createElement('link');
    link.id = 'swagger-theme-css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `/swagger-themes/${themeName}.css`; // Path to your generated CSS files
    document.head.appendChild(link);
  }

  // Load the default theme
  loadThemeCss(select.value);

  // Listen to dropdown change event
  select.addEventListener('change', (event) => {
    loadThemeCss(event.target.value);
  });
})();
