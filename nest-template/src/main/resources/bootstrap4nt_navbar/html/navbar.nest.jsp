<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>

<%--<template:addResources type="css" resources="bootstrap.min.css"/>--%>
<%--<template:addResources type="javascript" resources="jquery.min.js"/>--%>
<%--<template:addResources type="javascript" resources="popper.min.js"/>--%>
<%--<template:addResources type="javascript" resources="bootstrap.min.js"/>--%>

<c:set var="siteNode" value="${renderContext.site}"/>
<c:choose>
    <c:when test="${jcr:isNodeType(siteNode, 'bootstrap4mix:siteBrand')}">
        <c:set var="brandImage" value="${siteNode.properties.brandImage.node}"/>
        <c:set var="brandText" value="${siteNode.properties.brandText.string}"/>
    </c:when>
    <c:when test="${jcr:isNodeType(currentNode, 'bootstrap4mix:brand')}">
        <c:set var="brandImage" value="${currentNode.properties.brandImage.node}"/>
        <c:set var="brandText" value="${currentNode.properties.brandText.string}"/>
    </c:when>
</c:choose>

<c:if test="${jcr:isNodeType(currentNode, 'bootstrap4mix:customButtonNavbar')}">
    <c:set var="buttonClass" value="${currentNode.properties.buttonClass.string}"/>
</c:if>

<c:if test="${empty buttonClass}">
    <c:set var="buttonClass" value="navbar-toggler navbar-toggler-right"/>
</c:if>

<c:if test="${jcr:isNodeType(currentNode, 'bootstrap4mix:advancedNavbar')}">
    <c:set var="navClass" value="${currentNode.properties.navClass.string}"/>
    <c:set var="divClass" value="${currentNode.properties.divClass.string}"/>
    <c:set var="addContainerWithinTheNavbar" value="${currentNode.properties.addContainerWithinTheNavbar.boolean}"/>
    <c:set var="addLoginButton" value="${currentNode.properties.addLoginButton.boolean}"/>
</c:if>
<c:if test="${empty navClass}">
    <c:set var="navClass" value="navbar navbar-expand-lg navbar-light bg-light"/>
</c:if>
<c:if test="${empty divClass}">
    <c:set var="divClass" value="collapse navbar-collapse"/>
</c:if>
<c:if test="${empty addContainerWithinTheNavbar}">
    <c:set var="addContainerWithinTheNavbar" value="false"/>
</c:if>
<c:if test="${empty addLoginButton}">
    <c:set var="addLoginButton" value="false"/>
</c:if>

<c:set var="root" value="${currentNode.properties.root.string}"/>
<c:set var="curentPageNode" value="${renderContext.mainResource.node}"/>
<c:if test="${! jcr:isNodeType(curentPageNode,'jmix:navMenuItem')}">
    <c:set var="curentPageNode" value="${jcr:getParentOfType(curentPageNode, 'jmix:navMenuItem')}"/>
</c:if>

<c:set var="customRootNode" value="${currentNode.properties.customRoot.node}"/>

<c:choose>
    <c:when test="${renderContext.loggedIn && !empty customRootNode}">
        <c:set var="rootNode" value="${customRootNode}"/>
    </c:when>
    <c:when test="${root eq 'currentPage'}">
        <c:set var="rootNode" value="${curentPageNode}"/>
    </c:when>
    <c:when test="${root eq 'parentPage'}">
        <c:set var="rootNode" value="${curentPageNode.parent}"/>
    </c:when>
    <c:otherwise>
        <c:set var="rootNode" value="${renderContext.site.home}"/>
    </c:otherwise>
</c:choose>

<c:choose>
    <c:when test="${!empty customRootNode}">
        <c:set var="redirect" value="${customRootNode.url}"/>
    </c:when>
    <c:otherwise>
        <c:url var="redirect" value="${rootNode.url}"/>
    </c:otherwise>
</c:choose>
<c:url var="failureRedirect" value="${rootNode.url}"/>

<nav class="${navClass}">
    <c:if test="${addContainerWithinTheNavbar}">
    <div class="container">
    </c:if>
        <c:url var="rootNodeUrl" value="${rootNode.url}"/>
        <a class="navbar-brand" href="${rootNodeUrl}">
            <c:if test="${! empty brandImage}">
                <c:url var="brandImageUrl" value="${brandImage.url}"/>
                <img src="${brandImageUrl}" class="d-inline-block align-top" alt="">
            </c:if>
            ${brandText}
        </a>

        <button class="${buttonClass}" type="button" data-toggle="collapse"
                data-target="#navbar-${currentNode.identifier}" aria-controls="navbar-${currentNode.identifier}"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <c:choose>
            <c:when test="${renderContext.loggedIn}">
                <template:include view="hidden.nest.logged.nav">
                    <template:param name="divClass" value="${divClass}"/>
                    <template:param name="addLoginButton" value="${addLoginButton}"/>
                </template:include>
            </c:when>
            <c:otherwise>
                <template:include view="hidden.nest.login.nav">
                    <template:param name="divClass" value="${divClass}"/>
                    <template:param name="addLoginButton" value="${addLoginButton}"/>
                    <template:param name="redirect" value="${redirect}"/>
                    <template:param name="failureRedirect" value="${failureRedirect}"/>
                </template:include>
            </c:otherwise>
        </c:choose>


    <c:if test="${addContainerWithinTheNavbar}">
    </div>
    </c:if>
</nav>