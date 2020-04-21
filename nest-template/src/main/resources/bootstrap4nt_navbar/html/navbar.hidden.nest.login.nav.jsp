<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>

<c:set var="class" value="${currentResource.moduleParams.divClass}"/>
<c:set var="addLoginButton" value="${currentResource.moduleParams.addLoginButton}"/>

<div class="${class}" id="navbar-${currentNode.identifier}">
    <template:include view="basenav"/>

    <c:if test="${addLoginButton}">
        <template:include view="hidden.nest.login"/>
    </c:if>

    <template:include view="hidden.nest.search"/>
</div>