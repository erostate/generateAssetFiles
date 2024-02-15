/*
*   Global JS script
*
*   Project: asset.blms.fr
*   Author: Erostate
*   Version: 1.0
*   Date: 2024-02-15
*
*   License: BLMS
*   License URI: https://blms.fr/license
*/

// --- GLOBAL --- //
function changeFileType(sel) {
    var selected = sel.options[sel.selectedIndex].value;
    
    // TODO
}

function useBlmsColorTemplate(action) {
    if (action === true) {
        document.getElementById('btnUseBlmsColorTemplateTrue').classList.add('active');
        document.getElementById('btnUseBlmsColorTemplateFalse').classList.remove('active');
        document.getElementById('useBlmsColorTemplateStatus').value = 'true';
    } else {
        document.getElementById('btnUseBlmsColorTemplateTrue').classList.remove('active');
        document.getElementById('btnUseBlmsColorTemplateFalse').classList.add('active');
        document.getElementById('useBlmsColorTemplateStatus').value = 'false';
    }
}

function notForBlmsProject(sel) {
    if (sel.value == 'true') {
        sel.classList.remove('active');
        sel.value = 'false';
        document.getElementById('notForBlmsProjectStatus').value = 'false';

        document.getElementById('domain').innerText = '.blms.fr';
    } else {
        sel.classList.add('active');
        sel.value = 'true';
        document.getElementById('notForBlmsProjectStatus').value = 'true';

        document.getElementById('domain').innerText = '';
    }
}

function notDevForBlms(sel) {
    if (sel.value == 'true') {
        sel.classList.remove('active');
        sel.value = 'false';
        document.getElementById('notDevForBlmsStatus').value = 'false';
    } else {
        sel.classList.add('active');
        sel.value = 'true';
        document.getElementById('notDevForBlmsStatus').value = 'true';
    }
}

function generateFile() {
    const fileType = document.getElementById('fileType').value;
    
    const projectName = document.getElementById('projectName').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('desc').value;
    const date = new Date().toISOString().split('T')[0];
    if (document.getElementById('notForBlmsProjectStatus').value == 'true') {
        var domain = document.getElementById('domain').innerText;
        projectName = projectName + domain;
    }

    var content = "";
    var typeSlash = "";
    if (fileType == 'html') {
        content = `
<!--
    Project: ${projectName}
    Author: ${author}
    Date: ${date}

    License: BLMS
    License URI: https://blms.fr/license
-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="desc">
    <meta name="keywords" content="blms, web, dev, team, erostate, cubix, blooms studio">
    <meta name="author" content="Miguel Angel">
    <title>${projectName}</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <header></header>
    <main></main>
</body>
</html>
        `;
        typeSlash = "text/html";
    } else if (fileType == 'php') {
        alert('Not available yet');
        // TODO
    } else if (fileType == 'css') {
        content = `
/*
*   CSS File
*   ${projectName}
*
*   Project: ${projectName}
*   Author: ${author}
*   Version: 1.0
*   Date: ${date}
*
*   License: BLMS
*   License URI: https://blms.fr/license
*/

/* IMPORT */
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

/* VARIABLES */
:root {
    /* header */
    --header-background: #002338;
    --header-height: 50px;

    /* main */
    --main-background: #001626;
}

/* RESET */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: white;
    font-family: 'Nunito', sans-serif;
}

body {
    background-color: var(--main-background);
}
        `;
        typeSlash = "text/css";
    } else if (fileType == 'js') {
        content = `
/*
*   JS File
*   ${projectName}
*
*   Project: ${projectName}
*   Author: ${author}
*   Version: 1.0
*   Date: ${date}
*
*   License: BLMS
*   License URI: https://blms.fr/license
*/
        `;
        typeSlash = "application/javascript";
    } else {
        alert('File type not available');
        return;
    }

    // Create a new Blob object
    const blob = new Blob([content], { type: typeSlash });

    // Create a new Blob object
    const url = URL.createObjectURL(blob);
    
    // Create an element to download the file
    const a = document.createElement("a");
    a.href = url;
    a.download = projectName + '.' + fileType;

    // Append the element to the DOM
    document.body.appendChild(a);

    // Click the element
    a.click();

    // Remove the element
    document.body.removeChild(a);

    // Remove the Blob object
    URL.revokeObjectURL(url);
}


// --- MODAL --- //

function generateErrorModal(status) {
    console.log(status);
    if (status == 'active') {
        document.getElementById('teamList').style.display = 'none';
        document.getElementById('modalError').style.display = 'block';
        document.getElementById('modalError').innerHTML = 'Too many teams for the number of names... Please add some member';
    } else {
        document.getElementById('teamList').style.display = 'flex';
        document.getElementById('modalError').style.display = 'none';
        document.getElementById('modalError').innerHTML = '';
    }
}

// Open the modal
function openModal(modalName) {
    document.getElementById(modalName).style.display = 'block';
}
// Close the modal
function closeModal(modalName) {
    document.getElementById(modalName).style.display = 'none';
}
// Close the modal when clicking outside
window.onclick = function(event) {
    if (event.target.className == 'modal') {
        event.target.style.display = 'none';
    }
}
