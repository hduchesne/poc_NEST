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

<jcr:nodeProperty node="${currentNode}" name="jcr:title" var="cardTitle"/>
<jcr:nodeProperty node="${currentNode}" name="buttonText" var="ButtonText"/>
<jcr:nodeProperty node="${currentNode}" name="cardText" var="cardText"/>
<jcr:nodeProperty node="${currentNode}" name="cardImage" var="cardImage"/>
<jcr:nodeProperty node="${currentNode}" name="cardBodyColor" var="cardBodyColor"/>

<div class="card pb-2">
  <img class="card-img-top" src="${cardImage.node.url}" alt="${cardImage.node.name}">
  <div class="card-body" style="background-color: ${cardBodyColor}">
    <h5 class="card-title">${fn:escapeXml(cardTitle.string)}</h5>
    <p class="card-text">${cardText.string}</p>

    <c:set var="linkType" value="${currentNode.properties.linkType.string}" />
                    <c:set var="linkTarget" value="${currentNode.properties.linkTarget.string}" />

                    <c:choose>
                       <c:when test="${linkType eq 'internalLink'}">
                           <c:set var="internalLinkNode" value="${currentNode.properties.internalLink.node}"/>
                           <c:choose>
                               <c:when test="${! empty internalLinkNode}">
                                    <c:url var="linkUrl" value="${internalLinkNode.url}"/>
                               </c:when>
                            </c:choose>
                       </c:when>
                        <c:when test="${linkType eq 'externalLink'}">
                          <c:url var="linkUrl" value="${currentNode.properties.externalLink.string}"/>
                      </c:when>
                       <c:when test="${linkType eq 'self'}">
                            <c:url var="linkUrl" value="${currentNode.url}"/>
                       </c:when>
                    </c:choose>
                    <c:if test="${not empty ButtonText}">
                        <p class="card-text text-right">
                            <a href="${linkUrl}" class="mt-auto btn btn-primary" target="${linkTarget}">${ButtonText.string}</a>
                        </p>
                    </c:if>
  </div>
</div>

