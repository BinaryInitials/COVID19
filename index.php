<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/5.1.1/math.js"></script>
<link rel="shortcut icon" type="image/x-icon" href="logo.png" />
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="plot.js"></script>


<style>
	body {
		padding-top: 50px;
  		background: linear-gradient(180deg, #FFF,#EEE, #AAA,#EEE, #FFF);
  		background-attachment: fixed;
  		height: 125%;
	}
</style>

</head>

<body>

<nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
  <a class="navbar-brand" href="#"><img src="logo.png" width="30" height="30" alt=""> COVID-19</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Country<span class="sr-only">(current)</span></a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" onclick="wrapper('data_fr.json', 'France')"><img src="fb_france.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="wrapper('data_ge.json', 'Germany')"><img src="fb_germany.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="wrapper('data_it.json', 'Italy')"><img src="fb_italy.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="wrapper('data_ir.json', 'Iran')"><img src="fb_iran.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="wrapper('data_jp.json', 'Japan')"><img src="fb_japan.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="wrapper('data_sk.json', 'South Korea')"><img src="fb_south_korea.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="wrapper('data_sp.json', 'Spain')"><img src="fb_spain.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="wrapper('data_us.json', 'the US')"><img src="fb_us.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
        </div>
      </li>
      <li class="nav-item">
        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modal">About</a>
      </li>
  </ul>
  	<div class="nav-item">
     	 <script type='text/javascript' src='https://ko-fi.com/widgets/widget_2.js'></script><script type='text/javascript'>kofiwidget2.init('Coffee', '#AA5533', 'E1E81HLXN');kofiwidget2.draw();</script>
  	</div>
  </div>
</nav>


<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modal_label" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal_label">About</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Hi, my name is Binary Initials and I am a data scientist living in Seattle. I have bachelors in applied mathematics, molecular genetics, chemistry, and a master of engineering in biomedical engineering. As you have guessed it, I love math and science, especially when it comes to building math models.<br><br>

        I developed this tool because although many organizations have made great attempts at modeling the growth of COVID-19 via the use of exponential models, very few have done so through a logistic model. The latter is thought to be more realistic since it correctly depicts a level of saturation since as we know, the second law of thermodynamics and entropy forbid this kind of perpetually growth.<br><br>
        Another aspect that is unique about this page is that both exponential and logistic models are computed dynamically everytime a new data point is introduced. In other words, I have not precalculated the parameters in building this website: The parameters are being optimized everytime. <br><br>
        One thing to note from this tool is that it should illustrate nicely the imminent divergence of the data from the exponential model to the logistics one. This is captured by the inflection point metric denoted in green. The inflection point is the point where the model determines when the divergence will first occur. For all my calculus nerds, it is the point where the 2nd derivative is zero and therefore the growth no longer shows upward concavity curvature.<br><br>
        If you happen to find this tool useful or educational, consider making a small contribution for my efforts and time. 
        If you would like to contact me about this page or just want to say hello, feel free to leave a comment below or email me at binary.initials@gmail.com<br><br>
        Take care and stay safe,<br><br>

        -01

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>



<div class="container" id="loader" style="visibility: visible; margin-left: 40%; margin-top: 10px">
	Calculating...
	<div class="spinner-grow" role="status" id="loader">
	  <span class="sr-only">Loading...</span>
	</div>
</div>


<script type="text/javascript">
	function wrapper(filename, country){

		document.getElementById("loader").style.visibility = "visible";
    	document.getElementById("predictions").style.visibility = "hidden";
    	document.getElementById("metrics").style.visibility = "hidden";
    	
    	document.getElementById("graph").style.visiblity= "hidden";
    	document.getElementById("error").style.visiblity= "hidden";
    	document.getElementById("inflection").style.visiblity= "hidden";

		plot(filename, country);
	}
</script>
<div class="float" id="graph"></div>
<div class="float" id="error"></div>
<div class="float" id="inflection"></div>



<div class="container" id="predictions" style="visibility: hidden;">
	9-day Predictions:
	<table class="table table-striped table-bordered table-hover table-sm">
		<thead>
			<tr>
				<th class="col-1" scope="col">Date</th>
				<th class="col-2" scope="col">Exponential</th>
				<th class="col-3" scope="col">Sigmoid</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th id="row1_col1"></th>
				<td id="row1_col2"></td>
				<td id="row1_col3"></td>
			</tr>
			<tr>
				<th id="row2_col1"></th>
				<td id="row2_col2"></td>
				<td id="row2_col3"></td>
			</tr>
			<tr>
			<th id="row3_col1"></th>
				<td id="row3_col2"></td>
				<td id="row3_col3"></td>
			</tr>
			<th id="row4_col1"></th>
				<td id="row4_col2"></td>
				<td id="row4_col3"></td>
			</tr>
			<th id="row5_col1"></th>
				<td id="row5_col2"></td>
				<td id="row5_col3"></td>
			</tr>
			<th id="row6_col1"></th>
				<td id="row6_col2"></td>
				<td id="row6_col3"></td>
			</tr>
			<th id="row7_col1"></th>
				<td id="row7_col2"></td>
				<td id="row7_col3"></td>
			</tr>
			<th id="row8_col1"></th>
				<td id="row8_col2"></td>
				<td id="row8_col3"></td>
			</tr>
			<th id="row9_col1"></th>
				<td id="row9_col2"></td>
				<td id="row9_col3"></td>
			</tr>
			<th id="row10_col1"></th>
				<td id="row10_col2"></td>
				<td id="row10_col3"></td>
			</tr>
		</tbody>
	</table>
</div>


<div class="container" id="metrics" style="visibility: hidden;">
	Exponential Model:
	<pre>Time Constant, tau: <label id="model1_metric1"></label></pre>

	Sigmoid Model:
	<pre>Assymptotic Cases: <label id="model2_metric1"></label></pre>
	<pre>Time Constant, tau: <label id="model2_metric2"></label></pre>
	<pre>Inflection Point: <label id="model2_metric3"></label></pre>
</div>

<br>
<div class="container">
	Enter a comment here:
	<textarea class="form-control rounded-0" name="z" id="z" rows="6" cols="60"></textarea>
	<button class="btn btn-primary" type="submit" style="margin-top: 3px" onclick="prettify()">Submit</button>
</div>

<script>
	function prettify(){
		var m = document.getElementById("z").value;
		document.getElementById("z").value = "";
		var x = new XMLHttpRequest();
		x.open("POST", "comments.php", true);
		x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		x.onreadystatechange = function() {
	   		if (this.readyState == 4 && this.status == 200) {
	       		console.log(this.responseText);
	   		}
		};
		x.send("m="+m);
		return false;
	}
</script>
<br>
<div name="content" class="container text-monospace" id="content">
	<?php
    	include('load.php');
	?>
</div>

<script>
$(function () {
  $('[data-toggle="popover"]').popover()
})
</script>

<script>plot('data_us.json', 'the US');</script>

<!-- <script>
	setInterval(function(){$("#content").load("load.php");}, 2000);
</script>
 -->
</body>
</html>