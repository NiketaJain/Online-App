/******************Create Module *************************/

var app=angular.module('myApp',['ngStorage']);
app.controller('myCtrl',['$scope','$localStorage',function($scope, $localStorage)
{
	
	var tempEdit=0;
	$scope.$storage=$localStorage.$default({
		counter:1,
		Question_list:[]
		
	});
	$scope.indexvalue=0;
	$scope.listdata={};
	$scope.Question_list=[];
	$scope.answerType='MultiPunch';
	$scope.ishidden=false;
	$scope.products=[];
	$scope.correctResult=[];
	$scope.result=[];
	$scope.errorShow=true;
	
	$scope.qid=$localStorage.counter;
	$scope.error1=false;
	$scope.selectItem=$scope.products[0];
	$scope.previousButton=false;
	$scope.selected1=undefined;
	$scope.createbutton=true;
	$scope.updatebutton=true;
	$scope.cancelcreate=true;
	$scope.deleteDisabled=false;
	$scope.editDisabled=false;
	$scope.nextshow=true;

	
	


	
	
/****************Array-Of-Object(JSON)********************/
	$scope.createQ_list=function()
	{
		var data={}
		data.Question_Id=$scope.qid;
		//data.Question_Id=$localStorage.counter;
		data.Question=$scope.ques;
		data.Answer_Type=$scope.answerType;
		data.Answer_key=$scope.products;
		data.resultKey=$scope.correctResult;
		data.Answer_Selected_Checkbox=$scope.storeResult();
		data.Answer_Selected_Radio=$scope.selectItem;
		$localStorage.Question_list.push(data);
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
		$localStorage.counter=$localStorage.counter+1;
		$scope.qid=$localStorage.counter;

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
				res:false,
				isDelete:false
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

		$scope.answer="";
	}

/**************Delete-Answer*****************/
	
	$scope.removeItem=function(x)
	{
		$scope.products.splice(x,1);
	}


/**********Edit-Answer*******************/

	$scope.edit=function(x,value)
	{
		
		$scope.selected1=x;
		var val=$scope.products[x];
		$scope.correctResult[x].isDelete=true;
		var a=$scope.products.filter(function(ans)
		{
			if(ans!==val)
			{
				return ans;
			}
		});
		if(a.indexOf(value)===x)
		{
			$scope.editDisabled=false;
		}
		else
		{
			$scope.editDisabled=true;
		}

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
				$scope.correctResult[index].isDelete=false;
				$scope.editDisabled=false;
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
		$scope.qid=$localStorage.counter;
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
	$localStorage.Question_list.splice(x,1);
}

/******************Edit-Question-List********************/

$scope.EditQList=function(x)
{
	$scope.createbutton=false;
	$scope.updatebutton=false;
	$scope.cancelcreate=false;
	$scope.listdata=$localStorage.Question_list[x];
	$scope.qid=$localStorage.Question_list[x].Question_Id;
	$scope.ques=$localStorage.Question_list[x].Question;
	$scope.answerType=$localStorage.Question_list[x].Answer_Type;
	$scope.products=angular.copy($localStorage.Question_list[x].Answer_key);

	
		
	if($localStorage.Question_list[x].Answer_Type==="MultiPunch" && $localStorage.Question_list[x].Answer_Selected_Radio==="")
	{
		angular.forEach($localStorage.Question_list[x].resultKey,function(ans,ind){
			$scope.correctResult.push({
				res:ans.res
			});
		});
		$scope.selectItem="";
		$scope.showtype=true;
	}
	
	if($localStorage.Question_list[x].Answer_Type==="SinglePunch" && $localStorage.Question_list[x].Answer_Selected_Checkbox.length===0){
		
		$scope.selectItem=$localStorage.Question_list[x].Answer_Selected_Radio;
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



/*****************************User-View************************/

$scope.viewData=$localStorage.Question_list;
$scope.index=0;
$scope.count=0;
$scope.storeData=[];
$scope.selectedItemResult=[];

$scope.next=function(index)
{
	$scope.nextshow=true;
	$scope.index=index<$scope.viewData.length-1?index+1:$scope.viewData.length-1;
	if($scope.viewData[$scope.index].Answer_Type === "MultiPunch")
	{
		$scope.checkshow=true;

		
	}
	if($scope.viewData[$scope.index].Answer_Type === "SinglePunch")
	{
		$scope.checkshow=false;
		angular.forEach($scope.selectedItemResult,function(ans){
		ans.res=false;
			});
	}
	if($scope.index>=$scope.viewData.length-1)
	{
		$scope.nextshow=false;
		$scope.previousButton=true;

	}
}

$scope.submit=function()
{
	angular.forEach($scope.viewData,function(ques,index){
		if(ques.Answer_Type === "SinglePunch")
		{
			if($scope.storeData[index].resultRadio ===ques.Answer_Selected_Radio)
			{
				$scope.count=$scope.count+1;
			}
		}
		if(ques.Answer_Type === "MultiPunch")
		{
			var keyCount=0;
			angular.forEach(ques.resultKey,function(ans,ind)
			{
				if(ans.res === $scope.storeData[index].resultCheck[ind].res)
				{
					keyCount++;
				}
			});
			if(keyCount===ques.resultKey.length)
			{
				$scope.count=$scope.count+1;
			}
		}

	});
	alert("Your Score is\n\n"+$scope.count+"/"+$scope.viewData.length);
}
$scope.previous=function(index)
{
	$scope.index=index>0?index-1:0;
	if($scope.viewData[$scope.index].Answer_Type === "MultiPunch")
	{
		$scope.checkshow=true;
		
		
	}
	if($scope.viewData[$scope.index].Answer_Type === "SinglePunch")
	{
		$scope.checkshow=false;
		
		
	}

}

/****************************User-view-Selected-Checkbox-Result*****************************/



	angular.forEach($scope.viewData,function(ques,index){

		var checkboxData=[];
		angular.forEach(ques.Answer_key,function(ans,ind){
		checkboxData[ind]={

			res:false
		}
		
		 });
			 
		$scope.storeData[index]={
			qid:ques.Question_Id,
			resultRadio:0,
			resultCheck:checkboxData
		}
	});

}]); 
 