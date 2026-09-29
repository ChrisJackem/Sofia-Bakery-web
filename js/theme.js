// Dark and light css variables (need an object)
var cssVarProps = {
    dark: {
        '--color-background': '#000',
        '--color-input-bg': '#1d1d1d',
        '--color-text': '#FFF',
        '--color-primary': '#D88C5A'
    },
    light: {
        '--color-background': '#FFF8F0',
        '--color-input-bg': '#FFF',
        '--color-text': '#000',
        '--color-primary': '#D88C5A'
    }
}


// Sets the theme css vars using object
function setTheme(theme) {
   for (let [key, val] of Object.entries(cssVarProps[theme])){
       document.documentElement.style.setProperty(key, val);
   }            
} 

// We need the radios to exist before adding event listeners and setting the initial theme,
// so we wait until page has loaded
window.onload = () => {    
    // Save radio elements for use now and once one is clicked
    var themeRadios = document.querySelectorAll('input[name="theme"]');
    
    // radio events
    themeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            document.documentElement.dataset.theme = radio.value;
            // Save to localStorage
            localStorage.setItem('bakery-theme', radio.value);
            setTheme(radio.value);
        });
    });
    
    // localstorage loading and possible theme change
	const savedTheme = localStorage.getItem('bakery-theme');
	if (savedTheme) {
		// Set radios to saved theme 
        themeRadios.forEach(radio => {
			radio.checked = radio.value === savedTheme;
		});
        setTheme(savedTheme);
	}    
};
