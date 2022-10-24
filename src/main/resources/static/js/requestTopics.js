'use strict'

// confirmation of delete
// edit
// solution for transaction
// message store / key / gui
var app = angular.module('requestTopicsApp',[]);

app.controller("requestTopicsCtrl", function($scope, $http, $location, $window) {

	// Set http service defaults
	// We force the "Accept" header to be only "application/json"
	// otherwise we risk the Accept header being set by default to:
	// "application/json; text/plain" and this can result in us
	// getting a "text/plain" response which is not able to be
	// parsed.
	$http.defaults.headers.common['Accept'] = 'application/json';

    	$scope.showSubmitFailed = function(title, text){
		swal({
			 title: "",
			 text: "Request unsuccessful !!",
			 timer: 2000,
			 showConfirmButton: false
			 });
	}

        $scope.handleValidationErrors = function(error){
            if(error.errors != null && error.errors.length > 0){
                $scope.alert = error.errors[0].defaultMessage;
            }else if(error.message != null){
                $scope.alert = error.message;
            }else if(error.result != null){
                $scope.alert = error.result;
            }
            else
                $scope.alert = "Unable to process the request. Please verify the request or contact our Administrator !!";

            $scope.alertnote = $scope.alert;
            $scope.showAlertToast();
        }

	$scope.showAlertToast = function() {
                  var x = document.getElementById("alertbar");
                  x.className = "show";
                  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
                }

         $scope.getEnvTopicPartitions = function(envSelected){
                $scope.topicPrefix = null;
                $scope.topicSuffix = null;
             	    $http({
                            method: "GET",
                            url: "getEnvParams",
                             headers : { 'Content-Type' : 'application/json' },
                             params: {'envSelected' : envSelected }
                        }).success(function(output) {
                            $scope.envTopicMap = output;
                            if(output.topicPrefix != null)
                                $scope.topicPrefix = output.topicPrefix[0];
                            if(output.topicSuffix != null)
                                $scope.topicSuffix = output.topicSuffix[0];
                        }).error(
                            function(error)
                            {
                                $scope.alert = error;
                            }
                        );
             	}

        $scope.requestTitle = "Topic Create Request";
        $scope.requestType = "CreateTopic";
        $scope.requestButton = "Submit";

        $scope.loadEditTopicInfo = function(){
            var envSelected, topicSelected;

            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == "topicname")
                {
                    topicSelected = sParameterName[1];
                }
                else if (sParameterName[0] == "env")
                {
                    envSelected = sParameterName[1];
                }
            }

            if(!topicSelected && !envSelected)
                return;

            $scope.addTopic.topicname = topicSelected;
            $scope.addTopic.envName = envSelected;
            $scope.getEnvTopicPartitions(envSelected);

            $http({
                    method: "GET",
                    url: "getTopicDetailsPerEnv",
                     headers : { 'Content-Type' : 'application/json' },
                     params: {'envSelected' : envSelected,  'topicname' : topicSelected }
                }).success(function(output) {
                    if(output.topicExists){
                        $scope.requestTitle = "Topic Edit Request";
                        $scope.requestType = "EditTopic";
                        $scope.requestButton = "Submit Update";
                        $scope.topicIdForEdit = output.topicId;

                        $scope.oldtopicpartitions = output.topicContents.noOfPartitions;
                        $scope.addTopic.topicpartitions = '' + output.topicContents.noOfPartitions;
                        if($scope.envTopicMap.defaultPartitions == $scope.addTopic.topicpartitions)
                            $scope.addTopic.topicpartitions = $scope.addTopic.topicpartitions + " (default)"
                        $scope.addTopic.description = output.topicContents.description;
                    }
                    else{
                        swal({
                                 title: "",
                                 text: "Topic Edit Request : " + output.error,
                                 showConfirmButton: true
                             }).then(function(isConfirm){
                                    $window.location.href = $window.location.origin + $scope.dashboardDetails.contextPath + "/topicOverview?topicname=" + topicSelected;
                              });
                    }
                }).error(
                    function(error)
                    {
                        $scope.alert = error;
                    }
                );
        }

        $scope.addTopic = function() {

            var serviceInput = {};

            $scope.alert = null;
            $scope.alertnote = null;

            if(!$scope.addTopic.envName || $scope.addTopic.envName == "")
            {
                $scope.alertnote = "Please select an environment.";
                $scope.showAlertToast();
                return;
            }

            if($scope.addTopic.topicname == null || $scope.addTopic.topicname.length==0)
            {
                $scope.alertnote = "Please fill in topic name.";
                $scope.showAlertToast();
                return;
            }else
            {
                $scope.addTopic.topicname = $scope.addTopic.topicname.trim();
                if($scope.addTopic.topicname.length==0)
                {
                    $scope.alertnote = "Please fill in topic name.";
                    $scope.showAlertToast();
                    return;
                }

                if($scope.addTopic.topicname.indexOf(" ") > 0){
                    $scope.alertnote = "Topic name should not contain any spaces.";
                    $scope.showAlertToast();
                    return;
                }

                if($scope.addTopic.topicname.length < 5){
                    $scope.alertnote = "Topic name should be atleast 5 characters.";
                    $scope.showAlertToast();
                    return;
                }
            }

            if(!$scope.addTopic.topicpartitions || $scope.addTopic.topicpartitions == 'selected'){

                $scope.alertnote = "Please select topic partitions.";
                $scope.showAlertToast();
                return;
            }

            if(!$scope.addTopic.replicationfactor || $scope.addTopic.replicationfactor == 'selected'){

                $scope.alertnote = "Please select topic replication factor.";
                $scope.showAlertToast();
                return;
            }

            // selecting default partitions

            if(!$scope.addTopic.description)
            {
                $scope.alertnote = "Please fill in description.";
                $scope.showAlertToast();
                return;
            }
            else {
                $scope.addTopic.description = $scope.addTopic.description.trim();
                if($scope.addTopic.description.length==0)
                {
                    $scope.alertnote = "Please fill in description.";
                    $scope.showAlertToast();
                    return;
                }
            }

            var tmpTopicPartitions = $scope.addTopic.topicpartitions;
            var tmpTopicRepFactor = $scope.addTopic.replicationfactor;

            if(tmpTopicPartitions.indexOf("default") > 0)
            {
                tmpTopicPartitions = tmpTopicPartitions.replace(" (default)","");
            }

            // selecting default rf
            if(tmpTopicRepFactor.indexOf("default") > 0)
            {
                tmpTopicRepFactor = tmpTopicRepFactor.replace(" (default)","");
            }

            serviceInput['environment'] = $scope.addTopic.envName;
            serviceInput['topicname'] = $scope.addTopic.topicname;
            serviceInput['topicpartitions'] = tmpTopicPartitions;
            serviceInput['replicationfactor'] = tmpTopicRepFactor;
            serviceInput['teamname'] = $scope.teamname;
            serviceInput['appname'] = "App";//$scope.addTopic.app;
            serviceInput['remarks'] = $scope.addTopic.remarks;
            serviceInput['description'] = $scope.addTopic.description;
            if($scope.requestType == 'CreateTopic'){
                serviceInput['topictype'] = 'Create';

                $scope.httpCreateTopicReq(serviceInput);
            }
            else{
                serviceInput['topictype'] = 'Update';
                serviceInput['otherParams'] = $scope.topicIdForEdit;

                if($scope.addTopic.topicpartitions < $scope.oldtopicpartitions) {
                     swal({
                             title: "Are you sure?",
                             text: "To decrease partitions of a topic, topic has to be deleted.",
                             type: "warning",
                             showCancelButton: true,
                             confirmButtonColor: "#DD6B55",
                             confirmButtonText: "Yes, I understand the risks !",
                             cancelButtonText: "No, cancel please!",
                             closeOnConfirm: true,
                             closeOnCancel: true
                         }).then(function(isConfirm){
                             if (isConfirm.dismiss != "cancel") {
                                 $scope.httpCreateTopicReq(serviceInput);
                             } else {
                                 return;
                             }
                         });
                    }else {
                        $scope.httpCreateTopicReq(serviceInput);
                    }
            }

        };

        $scope.httpCreateTopicReq = function(serviceInput){
            $http({
                    method: "POST",
                    url: "createTopics",
                    headers : { 'Content-Type' : 'application/json' },
                    params: {'addTopicRequest' : serviceInput },
                    data: serviceInput
                }).success(function(output) {
                    if(output.result === 'success'){
                        swal({
                                 title: "Awesome !",
                                 text: "Topic Request : "+output.result,
                                 showConfirmButton: true
                             }).then(function(isConfirm){
                                    $window.location.href = $window.location.origin + $scope.dashboardDetails.contextPath + "/myTopicRequests?reqsType=created&topicCreated=true";
                             });
                    }
                    else{
                            $scope.alert = "Topic Request : "+output.result;
                            $scope.showSubmitFailed('','');
                        }
                }).error(
                    function(error)
                    {
                        $scope.handleValidationErrors(error);
                    }
                );
        }

        $scope.cancelRequest = function() {
            $window.location.href = $window.location.origin + $scope.dashboardDetails.contextPath + "/browseTopics";
        }

        $scope.getEnvs = function() {

                $http({
                    method: "GET",
                    url: "getEnvsBaseClusterFilteredForTeam",
                    headers : { 'Content-Type' : 'application/json' }
                }).success(function(output) {
                    $scope.allenvs = output;
                }).error(
                    function(error)
                    {
                        $scope.alert = error;
                    }
                );
            }


        $scope.refreshPage = function(){
                $window.location.reload();
            }

       $scope.getAuth = function() {
            $http({
                   method: "GET",
                   url: "getAuth",
                   headers : { 'Content-Type' : 'application/json' }
               }).success(function(output) {
                   $scope.dashboardDetails = output;
                   $scope.userlogged = output.username;
                   $scope.teamname = output.teamname;
                   $scope.userrole = output.userrole;
                   $scope.notifications = output.notifications;
                    $scope.notificationsAcls = output.notificationsAcls;
                    $scope.notificationsSchemas = output.notificationsSchemas;
                    $scope.notificationsUsers = output.notificationsUsers;

                    if(output.requestItems!='Authorized')
                    {
                        swal({
                                 title: "Not Authorized !",
                                 text: "",
                                 showConfirmButton: true
                             }).then(function(isConfirm){
                                    $scope.alertnote = "You are not authorized to request.";
                                    $scope.showAlertToast();
                                    $window.location.href = $window.location.origin + $scope.dashboardDetails.contextPath + "/index";
                             });
                    }

                   if(output.companyinfo == null){
                       $scope.companyinfo = "Company not defined!!";
                   }
                   else{
                       $scope.companyinfo = output.companyinfo;
                    }
                   if($scope.userlogged != null)
                       $scope.loggedinuser = "true";

                   $scope.checkPendingApprovals();
               }).error(
                   function(error)
                   {
                       $scope.alert = error;
                   }
               );
               	}

		$scope.redirectToPendingReqs = function(redirectPage){
				swal({
						title: "Pending Requests",
						text: "Would you like to look at them ?",
						type: "info",
						showCancelButton: true,
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "Yes, show me!",
						cancelButtonText: "No, later!",
						closeOnConfirm: true,
						closeOnCancel: true
					}).then(function(isConfirm){
						if (isConfirm.dismiss != "cancel") {
							$window.location.href = $window.location.origin + $scope.dashboardDetails.contextPath + "/"+redirectPage;
						} else {
							return;
						}
					});
			}

			$scope.checkPendingApprovals = function() {

				if($scope.dashboardDetails.pendingApprovalsRedirectionPage == '')
					return;

				var sPageURL = window.location.search.substring(1);
				var sURLVariables = sPageURL.split('&');
				var foundLoggedInVar  = "false";
				for (var i = 0; i < sURLVariables.length; i++)
				{
					var sParameterName = sURLVariables[i].split('=');
					if (sParameterName[0] == "loggedin")
					{
						foundLoggedInVar  = "true";
						if(sParameterName[1] != "true")
							return;
					}
				}
				if(foundLoggedInVar == "true")
					$scope.redirectToPendingReqs($scope.dashboardDetails.pendingApprovalsRedirectionPage);
			}

        $scope.logout = function() {
                    $http({
                        method: "POST",
                        url: "logout",
                        headers : { 'Content-Type' : 'application/json' }
                    }).success(function(output) {
                        $window.location.href = $window.location.origin + $scope.dashboardDetails.contextPath + "/" + "login";
                    }).error(
                        function(error)
                        {
                            $window.location.href = $window.location.origin + $scope.dashboardDetails.contextPath + "/" + "login";
                        }
                    );
                }


        $scope.sendMessageToAdmin = function(){

                if(!$scope.contactFormSubject)
                    return;
                if(!$scope.contactFormMessage)
                    return;
                if($scope.contactFormSubject.trim().length==0)
                    return;
                if($scope.contactFormMessage.trim().length==0)
                    return;

                $http({
                        method: "POST",
                        url: "sendMessageToAdmin",
                        headers : { 'Content-Type' : 'application/json' },
                        params: {'contactFormSubject' : $scope.contactFormSubject,'contactFormMessage' : $scope.contactFormMessage },
                        data:  {'contactFormSubject' : $scope.contactFormSubject,'contactFormMessage' : $scope.contactFormMessage }
                    }).success(function(output) {
                        $scope.alert = "Message Sent.";
                        swal({
                             title: "",
                             text: "Message sent.",
                             timer: 2000,
                             showConfirmButton: false
                         });
                    }).error(
                        function(error)
                        {
                            $scope.alert = error;
                        }
                    );
            }
}
);
