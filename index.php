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
  		background: linear-gradient(180deg, #CCC, #FFF);
	}
</style>

</head>

<body>

<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <a class="navbar-brand" href="#"><img src="logo.png" width="30" height="30" alt=""> COVID-19</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Country</a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" onclick="plot('data_fr.json', 'France')"><img src="fb_france.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="plot('data_ge.json', 'Germany')"><img src="fb_germany.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="plot('data_it.json', 'Italy')"><img src="fb_italy.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="plot('data_ir.json', 'Iran')"><img src="fb_iran.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="plot('data_jp.json', 'Japan')"><img src="fb_japan.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="plot('data_sk.json', 'South Korea')"><img src="fb_south_korea.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="plot('data_sp.json', 'Spain')"><img src="fb_spain.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onclick="plot('data_us.json', 'the US')"><img src="fb_us.png" width=50px height=40px></a>
          <div class="dropdown-divider"></div>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
      <div class="nav-item">
     	 <script type='text/javascript' src='https://ko-fi.com/widgets/widget_2.js'></script><script type='text/javascript'>kofiwidget2.init('un café SVP', '#AA5533', 'E1E81HLXN');kofiwidget2.draw();</script>
  	  </div>
  </ul>
  </div>
</nav>

<div class="float" id="graph"></div>
<div class="float" id="error"></div>

<div class="container" id="loader" style="visibility: visible; margin-left: 40%">
	<div class="spinner-grow" role="status" id="loader">
	  <span class="sr-only">Loading...</span>
	</div>
</div>

<div class="container" id="predictions" style="visibility: hidden;">
	9-day Predictions:
	<table class="table table-striped table-bordered table-hover table-sm">
		<thead>
			<tr>
				<th class="col-1" scope="col">#</th>
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
	<pre>This will happen on this date: <label id="model2_metric4"></label></pre>
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


<!-- <script>
	setInterval(function(){$("#content").load("load.php");}, 2000);
</script>
 -->
</body>
</html>