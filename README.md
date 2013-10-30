<h1>textition.js</h1>
jQuery plugin for text transitions

<h2>Initialization</h2>
To use <b>textition.js</b> you need jQuery library version 1.6 or later.
<br>
The initialization code can be inserted into container <code>\<head></code> or <code>\<body></code>.

<pre>
&lt;script type="text/javascript" src="js/jquery.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="js/textition.js"&gt;&lt;/script&gt;
</pre>

<ul>
<li><a href="js/textition.js">download textition.js</a></li>
<li><a href="http://code.jquery.com/jquery-1.10.2.min.js">download jQuery</a></li>
</ul>

<h2>Usage</h2>
Add method <b>textition()</b> to the object that contains text for transition.
<pre>
$(document).ready(function() {
   $('#example').textition(); 
});
</pre>
The text must be enclosed in tag <code>\<span></code>. Their number depends on the user's needs.
<pre>
&lt;div id="example"&gt;
   &lt;span&gt;First text&lt;/span&gt;
   &lt;span&gt;Second text&lt;/span&gt;
   &lt;span&gt;Third text&lt;/span&gt;
&lt;/div&gt;   
</pre>

Because the container <b>example</b> has three <code>\<span></code> elements, text will be appearing in three variants, sequentially replace each other.

<h2>Customization</h2>
<b>textition.js</b> has the following options
<table>
    <tr>
  	<td>speed</td>
      <td>text transition speed in seconds</td>
      <td>0.1 - 1000</td>
  </tr>

  <tr>
  	<td>animation</td>
      <td>animation type</td>
      <td>ease, ease-in, ease-out, ease-in-out, linear</td>
  </tr>
  <tr>
  	<td>distance</td>
      <td>Radius letters offsets</td>
      <td>1 - 1000</td>
  </tr>
  <tr>
  	<td>axise</td>
      <td>translate axise</td>
      <td>x, y, xy</td>
  </tr>
</table>
Example of the parameters usage
<pre>
$(document).ready(function() {
   $('#example').textition({
      speed: 2,
      animation: 'ease',
      distance: 100,
      axis: 'x'
   }); 
});                     
</pre>

Browser support: IE 10, Firefox 4, Safari 3.1, Opera 10.5
