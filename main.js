/******************Create Module *************************/

var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope)
{
	
	var tempEdit=0;
	$scope.listdata={};
	$scope.Question_list=[];
	$scope.answerType='MultiPunch';
	$scope.ishidden=false;
	$scope.products=[];
	$scope.correctResult=[];
	$scope.result=[];
	$scope.errorShow=true;
	$scope.counter=1;
	$scope.qid=$scope.counter;
	$scope.error1=false;
	$scope.selectItem=$scope.products[0];
	$scope.selected1=undefined;
	$scope.createbutton=true;
	$scope.updatebutton=true;
	$scope.cancelcreate=true;
	
	
/****************Array-Of-Object(JSON)********************/
	$scope.createQ_list=function()
	{
		var data={}
		data.Question_Id=$scope.qid;
		data.Question=$scope.ques;
		data.Answer_Type=$scope.answerType;
		data.Answer_key=$scope.products;
		data.resultKey=$scope.correctResult;
		data.Answer_Selected_Checkbox=$scope.storeResult();
		data.Answer_Selected_Radio=$scope.selectItem;
		$scope.Question_list.push(data);
		if($scope.products.length==1)
		{
			$scope.error1=true;
			$scope.ErrorText1="Add 2 or more than 2 answer ";
		}
		else
		{
				$scope.error1=false;
		}
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
	$scope.answerType='MultiPunch';
	$scope.answer="";
	$scope.products=[];
	$scope.Queslist=true;
	$scope.correctResult=[];
	$scope.result=[];
	$scope.ishidden=false;
	$scope.showtype=false;
	
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
		
		$scope.selected1=x;
		document.getElementById('deleteButton').disabled=true;

	}
	
	
	$scope.update=function(index,x)
	{
		var value=$scope.products[index];
			var a=$scope.products.filter(function(ans)
			{
				if(ans!==value)
				{

					return ans;
				}

			});
			if(a.indexOf(x)==-1){
				$scope.errorShow=false;
				$scope.products[index]=x;
				$scope.selected1=undefined;
			}
			else
			{
					$scope.errorShow=true;
					$scope.errorText="Answer is already in the list1";
			}

				
			$scope.answer="";
		

			
	}		

$scope.answerShow=function(index)
{
	if(index===$scope.selected1)
	{
		return false;
	}
	else
	{
		return true;
	}
	

	
}

/************Cancel-button********************/

	$scope.cancelList=function()
	{
		$scope.addAnswerHide=false;
		$scope.editAnswershow=false;
		$scope.answer="";
		//ishidden=false;
		$scope.createbutton=true;
		$scope.updatebutton=true;
		$scope.qid=$scope.counter;
		$scope.Reset_Form();
	
	}

/**************Result-Type************/

	$scope.result1=function(value)
	{
		if(value==="MultiPunch")
		{
			
			$scope.showtype=true;

			$scope.selectItem="";

		}
		if(value==="SinglePunch")
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

/************Delete-Question*********************/

$scope.DeleteQList=function(x)
{
	$scope.Question_list.splice(x,1);
}

/******************Edit-Question-List********************/

$scope.EditQList=function(x)
{
	$scope.createbutton=false;
	$scope.updatebutton=false;
	$scope.cancelcreate=false;
	$scope.listdata=$scope.Question_list[x];
	$scope.qid=$scope.Question_list[x].Question_Id;
	$scope.ques=$scope.Question_list[x].Question;
	$scope.answerType=$scope.Question_list[x].Answer_Type;
	$scope.products=angular.copy($scope.Question_list[x].Answer_key);

	
		
	if($scope.Question_list[x].Answer_Type==="MultiPunch" && $scope.Question_list[x].Answer_Selected_Radio==="")
	{
		angular.forEach($scope.Question_list[x].resultKey,function(ans,ind){
			$scope.correctResult.push({
				res:ans.res
			});
		});
		$scope.selectItem="";
		$scope.showtype=true;
	}
	
	if($scope.Question_list[x].Answer_Type==="SinglePunch" && $scope.Question_list[x].Answer_Selected_Checkbox.length===0){
		
		$scope.selectItem=$scope.Question_list[x].Answer_Selected_Radio;
		$scope.showtype=false;
	
	}

	
}

/************Update-Question-List************************/


$scope.updateList=function(Objid)
{

	if(Objid===$scope.listdata.Question_Id)
	{
		
		$scope.listdata.Question_Id=$scope.qid;
		$scope.listdata.Question=$scope.ques;
		$scope.listdata.Answer_Type=$scope.answerType;
		$scope.listdata.Answer_key=$scope.products;
		$scope.listdata.Answer_Selected_Checkbox=$scope.storeResult();
		$scope.listdata.resultKey=$scope.correctResult;
		$scope.listdata.Answer_Selected_Radio=$scope.selectItem;

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
		$scope.ishidden=false;
		$scope.createbutton=true;
		$scope.Reset_Form();
}


/******************Create-New-Question-Button*************/

$scope.createNewQ=function()
{
	$scope.ishidden=true;
	if($scope.answerType==="MultiPunch")
	{
		$scope.showtype=true;
		$scope.selectItem="";
	}
	if($scope.answerType==="SinglePunch")
	{
		$scope.showtype=false;
		angular.forEach($scope.correctResult,function(ans,ind){
			ans.res=false;
			
	});

	}
}

});



 
