<?php
$comment = $_POST["m"];
$ip = $_SERVER["REMOTE_ADDR"];
$geo = shell_exec('./getIP.sh ' . $ip);

if (!empty($comment)) {
	$file = fopen("comments.txt", "a") or die("Unable to open file!");
	$new_content = "<div class=\"container\" style=\"border:1px solid #cecece;\">";
	$new_content .= "<div style=\"color:blue\">" . date('Y-m-d @ H:i:s') . "</div>";
	$new_content .= "<font color=\"#0099FF\">" . $ip . ":" . $_SERVER["REMOTE_PORT"] . "</font><br>";
	$new_content .= "<button type=\"button\" class=\"btn btn-light\" data-toggle=\"popover\" data-placement=\"left\" data-content=\"" . $ip . "\">" . $comment . "</button>";
	$new_content .= "<br><div style=\"color:#AACCFF\"><small>" . $_SERVER['HTTP_USER_AGENT'] . "</small></div>";
	$new_content .= $geo;
	$new_content .= "</div><br>\n";

	fwrite($file, $new_content);
	fclose($file);
}
?>
