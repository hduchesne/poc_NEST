<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>

<c:set var="class" value="${currentResource.moduleParams.divClass}"/>
<c:set var="addLoginButton" value="${currentResource.moduleParams.addLoginButton}"/>
<c:set var="redirect" value="${currentResource.moduleParams.redirect}"/>
<c:set var="failureRedirect" value="${currentResource.moduleParams.failureRedirect}"/>

<div class="${class}" id="navbar-${currentNode.identifier}">
<%--    <template:include view="basenav"/>--%>
    <template:include view="nest.basenav"/>

    <c:if test="${addLoginButton}">
        <template:include view="hidden.nest.login">
            <template:param name="redirect" value="${redirect}"/>
            <template:param name="failureRedirect" value="${failureRedirect}"/>
        </template:include>
    </c:if>

    <template:include view="hidden.nest.search"/>
</div>