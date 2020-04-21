<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>

<template:addResources type="javascript" resources="vendor/handlebars.runtime.min.js"/>
<template:addResources type="javascript" resources="templates/userinfo.precompiled.js"/>
<template:addResources type="javascript" resources="userdata.js"/>

<script type="text/javascript">
    $(function() {
        // Handlebars.registerHelper("formatDate", (dateAsString) => {
        //     var date = new Date(dateAsString);
        //     return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
        // });

        $(".profile-loaded-subscriber").bind("profileLoaded", (e, data) => {
            var target = $(".profile-loaded-subscriber > .profile-data");
            var template = Handlebars.templates.userinfo;
            target.html(template(data.profileProperties));
        });
    });
</script>


<c:set var="class" value="${currentResource.moduleParams.divClass}"/>
<c:set var="addLoginButton" value="${currentResource.moduleParams.addLoginButton}"/>

<div class="${class} flex-column" id="navbar-${currentNode.identifier}" style="align-items: unset;flex-grow:unset;">

    <template:include view="basenav"/>
    <template:include view="hidden.nest.logout"/>

    <div class="flex-row d-flex justify-content-between mt-2 mb-2" style="margin-left:20px;">
        <template:include view="hidden.nest.logged.search"/>
        <div class="align-bottom">
            <span class="small mr-1">A</span>
            A
            <span class="lead text-primary ml-1">A+</span>
        </div>
    </div>
</div>
<c:if test="${addLoginButton}">
    <template:include view="hidden.nest.logged.user-details"/>
</c:if>