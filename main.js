/******************Create Module *************************/

var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope)
{
	$scope.data={};
	var tempEdit=0;
	$scope.selectItem=0;
	$scope.Question_list=[];
	$scope.answerType='radio';
	$scope.ishidden=false;
	$scope.products=[];
	$scope.correctResult=[];
	$scope.result=[];
	//$scope.errorShow=false;

/****************Array-Of-Object(JSON)********************/
	$scope.create=function()
	{
	
		$scope.data.Question_Id=$scope.qid;
		$scope.data.Question=$scope.ques;
		$scope.data.Answer_Type=$scope.answerType;
		$scope.data.Answer_key=$scope.products;
		$scope.data.Answer_Selected_Checkbox=$scope.storeResult();
		$scope.data.Answer_Selected_Radio=$scope.toggleResult();
		$scope.Question_list.push($scope.data);

		
	};
	
/***************Add-Answer*****************************/

	$scope.addItem=function()
	{

		if(!$scope.answer){return;}
		if($scope.products.indexOf($scope.answer)==-1){
			//$scope.errorShow=false;
			$scope.products.push($scope.answer);
			$scope.correctResult.push({
				res:false
			});
			$scope.result.push($scope.products.indexOf($scope.answer));
		}
		else
		{
			//$scope.errorShow=true;
			$scope.errorText="Answer is already in the list";
		}

		
	}

/**************Delete-Answer*****************/
	
	$scope.removeItem=function(x)
	{
		$scope.products.splice(x,1);
	}

/**********Edit-Answer*******************/

	$scope.edit=function(x)
	{
		$scope.addAnswerHide=true;
		$scope.editAnswershow=true;
		$scope.answer=$scope.products[x];
       setEditable(x);


	}
	function setEditable(id){
		tempEdit=id;
		
	}
	function getEditable(){
		return tempEdit;
	}
	


	$scope.add=function()
	{
		
			var a=$scope.products.filter(function(ans)
			{
				if(ans!==$scope.products[getEditable()])
				{
					return ans;
				}
			});
			alert(a);
			if(a.indexOf($scope.answer)==-1){
				alert("hello");
				$scope.products[getEditable()]=$scope.answer;
			}
			else
			{
					$scope.errorText="Answer is already in the list1";
			}
				
			$scope.answer="";
			$scope.editAnswershow=false;
			$scope.addAnswerHide=false;

	}		

/************Cancel-button********************/

	$scope.cancel=function()
	{
		$scope.addAnswerHide=false;
		$scope.editAnswershow=false;
		$scope.answer="";
	
	}

/**************Result-Type************/

	$scope.result1=function(value)
	{
		if(value=="checkbox")
		{
			$scope.showtype=true;
		}
		if(value=="radio")
		{
			$scope.showtype=false;
		}
	}

/*****************Multiple-Punch-Result *********************/

	$scope.storeResult=function()
	{
		var keys=[];
		angular.forEach($scope.correctResult,function(ans,ind)
		{
			if(ans.res)
			{
				keys.push(ind+1);
			}

		})
		return keys;
	}

/********************Single-punch-Result***************/

	$scope.toggleResult=function()
	{


	}
});

 
