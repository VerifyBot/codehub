console.log('');
console.log('👻 Libraries: JQuery 3.4.1 ( https://jquery.com/ ) & Code Mirror ( https://codemirror.net/ )');
console.log('🧬 Github: https://github.com/VerifyBot/')
console.log('');


function toExtension(language) {
  dict = {
    javascript: 'js',
    markdown: 'md',
    python: 'py'
  }

  if (language in dict) {
    return dict[language]
  }
  return language
}

$(window).keyup(e => {
  if (e.code === 'KeyB' && e.ctrlKey) {
    extension = toExtension(window.lang)
    answer = prompt('Save Code as File\nEnter a File Name:', `app`)

    if (!answer) return;
    console.log(answer);

    answer += '.'+extension

    code = [];

    $('.CodeMirror-line').each((i, el) => {
      code.push($(el).text())
    })
    code = code.join('\n');

    this.editor.setOption("readOnly", true);
    $('#loader-top').fadeIn();

    $.post('api.php', {
      method: 'downloadFile',
      code: code,
      filename: answer,
      extension: extension
    }, data => {
      var file_path = data;
      var a = document.createElement('A');
      a.href = file_path;
      a.download = `${answer}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      $.post('api.php', {method: 'deleteFile', fileurl: data})
      this.editor.setOption("readOnly", false);
      $('#loader-top').fadeOut(0);
    });
  }
});


$('.topnav a').click(e => {
  $elem = $(e.target);
  $('.topnav a.active').removeClass('active');
  $elem.addClass('active');

  lang = $elem.data('lang');
  window.lang = lang;
  this.editor.setOption("mode", lang);

});

function openNavbar() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


this.editor = CodeMirror(document.getElementById("codeeditor"), {
  lineNumbers: true,
  tabSize: 2,
  styleActiveLine: true,
  autofocus: true,
  theme: "moxer",
  mode: "javascript",
});
window.lang = 'javascript';