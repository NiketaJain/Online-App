/******************Create Module *************************/

var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope)
{
	
	var tempEdit=0;
	
	$scope.Question_list=[];
	$scope.answerType='radio';
	$scope.ishidden=false;
	$scope.products=[];
	$scope.correctResult=[];
	$scope.result=[];
	$scope.errorShow=true;
	$scope.counter=1;
	$scope.qid=$scope.counter;
	$scope.error1=false;
	$scope.selectItem=$scope.products[0];
	
/****************Array-Of-Object(JSON)********************/
	$scope.createQ_list=function()
	{
		var data={}
		data.Question_Id=$scope.qid;
		data.Question=$scope.ques;
		data.Answer_Type=$scope.answerType;
		data.Answer_key=$scope.products;
		data.Answer_Selected_Checkbox=$scope.storeResult();
		data.Answer_Selected_Radio=$scope.selectItem;
		$scope.Question_list.push(data);
		$scope.Queslist=true;
		$scope.counter=$scope.counter+1;
		$scope.qid=$scope.counter;
		$scope.Reset_Form();
		$scope.ishidden=false;

	};


/*******************Reset-Form****************************/
$scope.Reset_Form=function()
{
	$scope.ques="";
	$scope.answerType='radio';
	$scope.answer="";
	$scope.products=[];
	$scope.Queslist=true;
	angular.forEach($scope.correctResult,function(ans,ind){
				ans.res=false;
			});

} 
	
/***************Add-Answer*****************************/

	$scope.addItem=function()
	{

		if(!$scope.answer){return;}

		
		if($scope.products.indexOf($scope.answer)==-1){
			$scope.errorShow=false;
			$scope.products.push($scope.answer);
			$scope.correctResult.push({
				res:false
			});
			$scope.result.push($scope.products.indexOf($scope.answer));
		}
		else
		{
			$scope.errorShow=true;
			$scope.errorText="Answer is already in the list";
		}
		if($scope.products.length==1)
		{
			$scope.error1=true;
			$scope.ErrorText1="Add 2 or more than 2 answer ";
		}
		else
		{
				$scope.error1=false;
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
	
	$scope.update=function()
	{
		
			var a=$scope.products.filter(function(ans)
			{
				if(ans!==$scope.products[getEditable()])
				{
					return ans;
				}
			});
			if(a.indexOf($scope.answer)==-1){
				$scope.errorShow=false;
				$scope.products[getEditable()]=$scope.answer;
			}
			else
			{
					$scope.errorShow=true;
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
		ishidden=false;
	
	}

/**************Result-Type************/

	$scope.result1=function(value)
	{
		if(value=="checkbox")
		{
			$scope.showtype=true;
			$scope.selectItem="";

		}
		if(value=="radio")
		{
			$scope.showtype=false;
			angular.forEach($scope.correctResult,function(ans,ind){
				ans.res=false;
			});
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

/*********************Selected Result Display on Question list Table***********/
$scope.selectedResult=function(Answer_Selected_Checkbox,Answer_Selected_Radio)
{
	if(Answer_Selected_Radio==="")
	{
		return Answer_Selected_Checkbox;
	}
	else
	{
		return Answer_Selected_Radio;
	}
}	


});

 
