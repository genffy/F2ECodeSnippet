<?php
date_default_timezone_set('Asia/shanghai');
header('Content-Type: text/html; charset=utf-8');

if (preg_match('/\.(?:png|jpg|jpeg|gif|html|js|css)$/', $_SERVER["REQUEST_URI"]))
    // 直接返回请求的文件
    return false;
else {
    if( $_SERVER['SCRIPT_NAME'] === '/jsonp'){
       // do json p stuff
		$data = array(
			'code' => 0,
			'data' => array(
				'name' => 'lee genffy',
				'email' => 'lee.genffy@gmail.com',
				'phone' => '1234567890'
			)
		);
	   header('Content-Type: application/javascript');
	   echo $_GET['jsonp_callback'].'('.json_encode($data).')';
    }else{
       header('Content-Type: text/html');
	   echo '<h1>PHP 是世界上最好的语言</h1>';
    }
}
?>
