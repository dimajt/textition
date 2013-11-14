<h1>textition.js</h1>
Textition.js is jQuery plugin for smooth transitions between text blocks. 
<br>
It can be used to stylize titles, menu buttons, or any other text.
<br>
<b><a href="http://dimajt.github.io/textition/#demos" target="_blank">Demo</a></b>


<h2>Initialization</h2>
To use textition.js you need jQuery library version 1.6 or later.
<br>
The initialization code can be inserted into <i>head</i> or body tag.

<pre>
&lt;script type="text/javascript" src="js/jquery.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="js/textition.js"&gt;&lt;/script&gt;
</pre>

<ul>
<li><a href="http://dimajt.github.io/textition/js/textition.js" target="_blank">textition.js</a></li>
<li><a href="http://code.jquery.com/jquery-1.10.2.min.js" target="_blank">jQuery 1.10.2</a></li>
</ul>

<h2>Usage</h2>
Add method textition() to the object that contains text for transition.
<pre>
$(document).ready(function() {
   $('#example').textition(); 
});
</pre>
The text should be in block element. The number of text blocks is not limited.
<pre>
&lt;div id="example"&gt;
   &lt;span&gt;First text&lt;/span&gt;
   &lt;span&gt;Second text&lt;/span&gt;
   &lt;span&gt;Third text&lt;/span&gt;
&lt;/div&gt;   
</pre>

Because example has three <i>div</i>, text will be appearing in three variants, replace each other step by step.

<h2>Customization</h2>
Textition.js has some options. You can get acquainted with them in <a href="http://dimajt.github.io/textition/#docs" target="_blank">documentation.</a>
<br>
Example of the parameters usage:
<pre>
$(document).ready(function() {
   $('#example').textition({
      handler: 'mouseenter',
      animation: 'ease-in-out',
      speed: 1
   });
});                  
</pre>

<h2>Browser support</h2>
Chrome 4.0, Safari 3.1, Firefox 4, Opera 10.5, Internet Explorer 10
