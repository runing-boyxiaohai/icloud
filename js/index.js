var app=angular.module("book",[])	
	app.directive("ngX",function(){
		return  {
			restrict:"A",
			replace:true,
			link:function($scope,el){
				$(el).on("click",function(){
					$scope.$apply(function(){
						for(var i=0;i<$scope.theme.length;i++){
							if($scope.theme[i].color==$scope.lists[$scope.cu].color){
								$scope.cu2=i;
							}
						}
						
					})
					$(".list").toggleClass("active");
					$scope.savelocal();
					return false;
				})
				$(".list").on("click",false)
				$("body").on("click",function(){
					$(".list").removeClass("active");
					return false;
				})
			}
		}
	})
//	选中


////完成
	app.directive("done",function(){
		return {
			restrict:"A",
			replace:true,
			link:function($scope,el){
				$(el).on("click",".hh",function(){
					$(".hh").find(".colorBg").addClass("activeq")
					$(this).find(".colorBg").removeClass("activeq")
					var index=$(this).index();
					$scope.$apply(function(){
						$scope.cu2=index;
						$scope.savelocal()
					})
					return false;
				})
				
			}	
		}
	})
/////点击消失
	app.directive("hide",function(){
		return {
			restrict:"A",
			replace:true,
			link:function($scope,el){
				$("#hide").on("click",function(){
					$(".remind").toggleClass("hide")
				})
				
			}	
		}
	})
	
//事情处理
		app.directive("myThing",function(){
		return {
			restrict:"A",
			replace:true,
			link:function($scope,el){
				$(el).on("click",".biaoqian",function(){
					$(".biaoqian").removeClass($scope.lists[$scope.cu].color)
					$(this).addClass($scope.lists[$scope.cu].color)
					return false;
					})
				$(el).on("click",".project",function(){
					var num=$scope.lists[$scope.cu].todos.length+1
					var v={name:"",state:"0",date:"10",id:num}
					$(".biaoqian").removeClass($scope.lists[$scope.cu].color)
					$scope.$apply(function(){
						$scope.lists[$scope.cu].todos.push(v)
						$scope.savelocal();
					})
					$(".biaoqian:last").addClass($scope.lists[$scope.cu].color);
					$(".biaoqian:last").find("input").removeAttr("readonly").focus()
//					$(".biaoqian:last").find("input").on("blur",function(){
//						if($.trim($(".biaoqian:last").find("input").val())==""){
//								$scope.$apply(function(){
//									$scope.lists[$scope.cu].todos.pop(v)	
//							})
//						}
//						else{
//							v.name=$(".biaoqian:last").find("input").val()
//							$(".biaoqian:last").removeClass($scope.lists[$scope.cu].color)
//						}
//						return false;
//					})
					$(el).on("blur",".biaoqian:last input",function(){
						if($.trim($(".biaoqian:last").find("input").val())==""){
								$scope.$apply(function(){
									$scope.lists[$scope.cu].todos.pop(v)	
									$scope.savelocal();
							})
						}
						else{
							if($scope.lists[$scope.cu].todos.length-1<0){
								return ;
							}
							$scope.lists[$scope.cu].todos[$scope.lists[$scope.cu].todos.length-1].name=$(".biaoqian:last").find("input").val()
							$scope.savelocal();
							$(".biaoqian:last").removeClass($scope.lists[$scope.cu].color)
						}
						
						return false;		
					})
					
					$(el).on("keyup",".biaoqian input",function(){
						console.log(2)
						return false;
					})
					
					return false;
					})
				$(el).on("click",".circle1",function(){
					console.log(1)
					$(this).animate({"margin-left":"-30px","opacity":"0"},200,"linear",function(){
						var a=$(this).closest(".biaoqian").index();
						console.log(a)
						return false;
					})
					$(this).next().animate({"margin-left":"-140px","opacity":"0"},500,"linear",function(){
						var a=$(this).val();
						var b;
						$scope.lists[$scope.cu].todos.forEach(function(v,i){
								if(v.name==a){
									b=v
								}
							})
						
						$scope.$apply(function(){
								if(b.state==1){
									b.state=0
								}
								else if(b.state==0){
									b.state=1
								}
								
						})
						$scope.savelocal();
						console.log(b)
						return false;
					})
					
				})
				$(el).on("click",".biaoqian",function(){
					console.log(1)
					$(el).find("input").attr("readonly","readonly")
					$(el).on("keyup",".biaoqian",function(e){			         //编辑事件
					if(e.keyCode==8||e.keyCode==46){
						var a=$(this).find("input").val();
						console.log(a)
						var b;
						$scope.lists[$scope.cu].todos.forEach(function(v,i){
								if(v.name==a){
									b=i
								}
							})
						console.log(b)
						console.table($scope.lists[$scope.cu].todos)
						$scope.$apply(function(){
							$scope.lists[$scope.cu].todos.splice(b,1)		
						})
						$scope.savelocal();
					}
					return false;
				});
				})
				$(el).on("dblclick",".biaoqian",function(){		//右边双击获取焦点
					flag=false
					$(el).find("input").attr("readonly","readonly")
					$(this).find("input").removeAttr("readonly")
					$(this).find("input").focus();	
					$(el).on("keyup",".biaoqian input",function(){
						console.log("shuangji")
						return false;
					})
					return false;
				})
			}
		}
	})
	
	
	
	
	
	
	
	app.directive("myUl",function(){
		return {
			restrict:"A",
			replace:true,
			transclude:true,
			template:"<ul class='tip'><div ng-transclude></div><ul>",
			link:function($scope,el){
				$(".left .tip li").removeClass("listactive")
				$(".left .tip li").eq($scope.cu).addClass("listactive")
				console.log($(".left .tip li"))
				
				$(el).on("click","li",function(e){
					$(el).find("li").removeClass("listactive");
					$(this).addClass("listactive");	
					$(".list").removeClass("active");
					var that=this;
					$scope.$apply(function(){
						$scope.cu=$(that).index();
					})
					$scope.savelocal();
					return false;
				})
				$(el).on("keyup",false);
				
				$(el).on("dblclick","input",function(e){	  //双击获取焦点
					$(el).find("input").attr("readonly","readonly")
					$(this).removeAttr("readonly")
					$(this).focus();	
				})
				$(document).on("click",":input",function(){
					$scope.savelocal();
					return false;
				})
				$(document).on("keyup",function(e){				//
					if(e.keyCode==8||e.keyCode==46)
					{	
						var li=$(".tip").find(".listactive")
						var lis=$(".tip").find("li");
						var index=lis.index(li);
						if(index==-1){
							return ;
						}
						$scope.$apply(function(){
							$scope.lists.splice(index,1);
//						$(".tip").find("li").removeClass("listactive");
//						$(".tip").eq(0).addClass("listactive");	
						})

						$scope.savelocal()
						return false;
					}	
				})
			}
		}
	})
	///////////添加删除
	app.controller("mainCtrl",["$scope",function($scope){
		$scope.colors=["purple","green","blue","yellow","black","red","orange"]
		if(localStorage.reminder1&&JSON.parse(localStorage.reminder1).length!=0){
			$scope.lists=JSON.parse(localStorage.reminder1)
			$scope.cu=JSON.parse(localStorage.cu)
		}else{
			$scope.lists=[
			{
			id:10001,
			name:"新列表1",
			color:"purple",
			todos:[
			{"name":"水浒传","state":1,"date":"10","id":1},
			{"name":"西游记","state":1,"date":"10","id":2},
			{"name":"hh1","state":0,"date":"10","id":3}
			]
		}
			]
			$scope.cu=0
		}
		
		
		$scope.cu2=$scope.cu;
		$scope.theme=[
		{
			color:"purple"
		},
		{
			color:"green"
		},
		{
			color:"blue"
		},
		{
			color:"yellow"
		},
		{
			color:"black"
		},
		{
			color:"red"
		},
		{
			color:"orange"
		}
		]
//		$scope.lists=[
//		{
//			id:10001,
//			name:"新列表1",
//			color:"purple",
//			todos:[
//			{"name":"水浒","state":1,"date":"10"},
//			{"name":"西游","state":1,"date":"10"},
//			{"name":"hh","state":0,"date":"10"}
//			]
//		},
//		{
//			id:10002,
//			name:"新列表2",
//			color:"green",
//			todos:[
//			{"name":"水浒","state":1,"date":"10"},
//			{"name":"西游","state":1,"date":"10"},
//			{"name":"hh","state":0,"date":"10"}
//			]
//		},
//		{
//			id:10003,
//			name:"新列表3",
//			color:"blue",
//			todos:[
//			{"name":"水浒","state":0,"date":"10"},
//			{"name":"西游","state":1,"date":"10"},
//			{"name":"hh","state":0,"date":"10"}
//			]
//		}
//		]
	
		////////////////////////////////////////////
		function maxId(){
			var max=0;
			for(var i=0;i<$scope.lists.length;i++){
				if(max<$scope.lists[i].id){
					max=$scope.lists[i].id;
				}
			}
			return max;
		}

		////////////////////////////////////////////
		
		
		$scope.savelocal=function(){
			localStorage.reminder1=JSON.stringify($scope.lists);
			localStorage.cu=JSON.stringify($scope.cu);
		}
		
		
		
		$scope.addlist=function(){					     /////添加保存
			var v=($scope.lists.length)%7
			var obj={
				id:maxId(),
				name:"新列表"+($scope.lists.length+1),
				color:$scope.colors[v],
				todos:[]
			}
			$scope.lists.push(obj);
			$scope.savelocal()
		}
		
		
		$scope.delete2=function(){
			var li=$(".tip").find(".listactive")
			var lis=$(".tip").find("li");
			var index=lis.index(li);
			if(index==-1){
				return ;
				}
			$scope.lists.splice(index,1);
			$(".list").removeClass("active");
			$scope.savelocal()
			if(index==lis.length-1){
				$scope.cu=0
			}
			
		}
		
		$scope.cancel=function(){
			$(".list").removeClass("active");
		}
		
		$scope.finish=function(){
			$scope.lists[$scope.cu].color=$scope.theme[$scope.cu2].color
//			$scope.cu2=$scope.cu;
			$(".list").removeClass("active");
			$scope.savelocal()
		}
		
		$(".search").find("input").on("focus",function(){
			$(this).css({"background":"#fff","borderRight":"1px solid rgba(128, 128, 128, 0.35)"})
			
		})
		
		$(".search").find("input").on("blur",function(){
			$(this).css({"background":"transparent","borderRight":0})
		})
		
		$scope.count=function(){								   //计算已完成事项
			var r=0;
			$scope.lists[$scope.cu].todos.forEach(function(v,i){
				if(v.state==1){
					r++
				}
			})
			
			return r;
		}
		
		$scope.clear=function(){								//清除已完成事件
			var newarr=[]
			$scope.lists[$scope.cu].todos.forEach(function(v,i){
				if(v.state==0){
					newarr.push(v)
				}
			})
			$scope.lists[$scope.cu].todos=newarr;
			$scope.savelocal();
		}
							
	}])
	