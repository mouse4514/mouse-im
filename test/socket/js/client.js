	var socket;
	var firstconnect = true;
	socket = io.connect("http://127.0.0.1:3000");
	function connect() {
	    if(firstconnect) {
	    	socket.on('message', function(data){ message(data); });
	    	socket.on('connect', function(){ status_update("连接成功!"); });
	    	socket.on('disconnect', function(){ status_update("断开连接成功!"); });
	    	socket.on('reconnect_failed', function(){  });
	    	socket.on('reconnect', function(){ status_update("重新连接成功!"); });
	    	socket.on('reconnecting', function( nextRetry ){ });
	        firstconnect = false;
	    } else {
	    	socket.io.reconnect();
	    }
	}

	function disconnect() {
		socket.io.disconnect();
	}
	 
	function send(message) {
		socket.send(message);
	};
	socket.on('reply_msg', function(data){
		$("#callback").html(data.data);
	});
	socket.on('public_msg', function(data){
		alert(data);
		$("#callback").html(data.data);
	});
	socket.on('private_msg', function(data){
			alert("private_msg:"+data);
		//eval(data.action+'(data)');
		//$("#callback").html(data.data);
	});
	socket.on('sid', function(data){
		$("#sid").html(data.data);
	});
	socket.on('alert', function(data){
		alert(data.data);
	});
	/**
	 * 发送自定义消息
	 * 	socket.emit("private_msg",{method:"user",action:"getUser",username:username,password:"password"},function(data){
			alert("fdsaf");
		});
	 */
	function emit($msg_type,$param,callback) {
		socket.emit($msg_type,$param,callback);
	};
	
	function message(data){
		$("#message").html(data);
	}
	function status_update(data){
		$("#status").html(data);
	}

function createMeeting(data){
	var li = '';
	li = '<li>'+data.from_id+":"+data.name+'<a onclick="inviteBack('+'\''+data.id+'\',\''+'1'+'\''+')" href="javascript:void(0)">接受</a>&nbsp;&nbsp;<a onclick="inviteBack('+'\''+data.id+'\',\''+'-1'+'\''+')" href="javascript:void(0)">拒接</a></li>';
	$("#private_msg").append(li);
	$("#toid").val(data.from_id);
}

function updateMeetingInfo(data){
	alert(data.status)
}

function callFrontDesk(data){
	alert(data.name + "需要" + data.service_type)
}
