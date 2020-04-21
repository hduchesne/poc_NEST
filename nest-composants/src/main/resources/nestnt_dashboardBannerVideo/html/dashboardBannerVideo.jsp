<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="ui" uri="http://www.jahia.org/tags/uiComponentsLib" %>
<%@ taglib prefix="functions" uri="http://www.jahia.org/tags/functions" %>
<%@ taglib prefix="query" uri="http://www.jahia.org/tags/queryLib" %>
<%@ taglib prefix="utility" uri="http://www.jahia.org/tags/utilityLib" %>
<%@ taglib prefix="s" uri="http://www.jahia.org/tags/search" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="out" type="java.io.PrintWriter"--%>
<%--@elvariable id="script" type="org.jahia.services.render.scripting.Script"--%>
<%--@elvariable id="scriptInfo" type="java.lang.String"--%>
<%--@elvariable id="workspace" type="java.lang.String"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="currentResource" type="org.jahia.services.render.Resource"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>

<template:addResources type="css" resources="nestNews.css"/>
<template:addResources type="css" resources="videoButton.css"/>

<c:set var="title" value="${currentNode.properties['jcr:title'].string}"/>
<c:set var="bannerText" value="${currentNode.properties['bannerText'].string}"/>
<c:set var="itemWidth" value="${currentNode.properties['itemWidth'].string}"/>

<%-- get the child items --%>
<c:set var="videos" value="${jcr:getChildrenOfType(currentNode, 'nestnt:nestExternalVideo,nestnt:nestInternalVideo')}"/>
<c:set var="blocks" value="${jcr:getChildrenOfType(currentNode, 'nestnt:nestFreeBlock')}"/>

<c:set var="rand">
    <%= java.lang.Math.round(java.lang.Math.random() * 10000) %>
</c:set>
<c:set var="carouselId" value="carousel-${rand}"/>

<!--Card-->
<div class="card">


<!--Card content-->
<div class="card-body">
<!--Title-->
<h1 class="card-title text-center text-primary">${title}</h1>
<!--Text-->

<!-- Grid row -->
<div class="row">

       <div class="col-md-5 pt-3 pl-3 pr-3 pb-1">

                <div id="left-${carouselId}" class="carousel slide" data-ride="carousel">

                            <div class="carousel-inner">
                                <c:forEach items="${blocks}" var="block" varStatus="status">
                                     <div class="carousel-item ${status.first?' active':''}">
                                       <div class="col-md-12 mb-3">
                        			    <template:module node="${block}"  editable="true"/>
                        			    </div>
                                    </div>
                                </c:forEach>
                            </div>
                             <ol class="carousel-indicators" style="justify-content: flex-start;">
                                <c:forEach items="${blocks}" var="block" varStatus="status">
                                    <li data-target="#left-${carouselId}" data-slide-to="${status.index}" class="rounded-circle ${status.first?' active':''}"></li>
                                </c:forEach>

                            </ol>
                 </div>

        </div>
        <!-- Carousel start -->
        <div class="col-md-7 pt-3 pl-3 pr-3 pb-1" style="border-left: 1px solid rgba(34, 36, 38, .1);">
           <div class="row">
                <div class="col-md-7 px-3">
                  <p class="card-text text-left text-secondary">${bannerText}</p>
                </div>
                 <div class="col-md-5">

            <div id="right-${carouselId}" class="carousel slide">

                <div class="carousel-inner">
                    <c:forEach items="${videos}" var="video" varStatus="status">
                         <div class="carousel-item ${status.first?' active':''}">
                           <div class="col-md-12 mb-3 text-right">
            			    <template:module node="${video}"  editable="true"/>
            			    </div>
                        </div>
                    </c:forEach>
                </div>
                <ol class="carousel-indicators" style="justify-content: flex-end;">
                    <c:forEach items="${videos}" var="video" varStatus="status">
                        <li data-target="#right-${carouselId}" data-slide-to="${status.index}" class="rounded-circle ${status.first?' active':''}"></li>
                    </c:forEach>
                </ol>
            </div>
        </div>
        <!-- End of carousel -->
    </div>
    </div>


</div>
<!-- Grid row -->

</div>
</div>
<!--/.Card-->

<c:if test="${renderContext.editMode}">
    <%--
    As only one child type is defined no need to restrict
    if a new child type is added restriction has to be done
    using 'nodeTypes' attribute
    --%>
    <template:module path="*" />
</c:if>