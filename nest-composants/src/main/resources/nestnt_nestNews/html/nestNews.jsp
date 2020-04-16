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

<jcr:nodeProperty node="${currentNode}" name="jcr:title" var="newsTitle"/>
<jcr:nodeProperty node="${currentNode}" name="desc" var="newsBody"/>
<jcr:nodeProperty node="${currentNode}" name="date" var="newsDate"/>
<jcr:nodeProperty node="${currentNode}" name="buttonText" var="newsButtonText"/>
<c:set var="images" value="${jcr:getChildrenOfType(currentNode, 'nestnt:galleryImg')}"/>
<c:set var="galleryImgs" value="${currentNode.properties['nestGalleryImg']}"/>

<!-- Card Start -->
<div class="card">
    <div class="row ">

        <div class="col-md-7 px-3">
            <div class="card-block px-6">
                <h4 class="card-title">${fn:escapeXml(newsTitle.string)} </h4>
                <p class="card-text">
                    ${functions:abbreviate(functions:removeHtmlTags(newsBody.string),400,450,'...')}
                </p>
                <br/>
                <a href="#" class="mt-auto btn btn-primary  ">${newsButtonText.string}</a>
                <br/>

            </div>

        </div>
        <!-- Carousel start -->
        <div class="col-md-5">
            <div id="CarouselTest" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#CarouselTest" data-slide-to="0" class="active"></li>
                    <li data-target="#CarouselTest" data-slide-to="1"></li>
                    <li data-target="#CarouselTest" data-slide-to="2"></li>

                </ol>
                <div class="carousel-inner">
                <c:forEach items="${galleryImgs}" var="galImage" varStatus="status">
                    <div class="carousel-item ${status.first?' active':''}">

                        <img class="card-img d-block" src="${galImage.node.url}" alt="${galImage.node.path}">

                    </div>
                </c:forEach>

                    <a class="carousel-control-prev" href="#CarouselTest" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#CarouselTest" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
        <!-- End of carousel -->
    </div>
    <div class="card-footer text-muted">
        <fmt:formatDate value="${newsDate.date.time}" pattern="dd/MM/yyyy"/>
    </div>
</div>
<!-- End of card -->
