<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="ui" uri="http://www.jahia.org/tags/uiComponentsLib" %>
<%@ taglib prefix="functions" uri="http://www.jahia.org/tags/functions" %>
<%--@elvariable id="currentUser" type="org.jahia.services.usermanager.JahiaUser"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>

<%--<c:set var="showModal" value="${not empty param['loginError'] ? 'true' : 'false'}"/>--%>
<form class="form-inline nav-item" method="post" name="logoutForm" action="${url.logout}">
    <input type="hidden" name="site" value="nest">
    <input type="hidden" name="redirect" value="/sites/nest/home.html">
    <input type="hidden" name="failureRedirect" value="/sites/nest/home-loggedin.html">
    <button class="btn nav-link text-uppercase" type="submit"> <fmt:message key="login-form.label.logout"/></button>
</form>


<%--<form class="form-inline" method="post" name="logoutForm" action="${url.logout}">--%>
<%--    <input type="hidden" name="site" value="nest">--%>
<%--    <input type="hidden" name="redirect" value="/sites/nest/home.html">--%>
<%--    <input type="hidden" name="failureRedirect" value="/sites/nest/home-loggedin.html">--%>
<%--    <button class="btn btn-primary-nest my-2 my-sm-0" type="submit"> <fmt:message key="login-form.label.logout"/></button>--%>
<%--</form>--%>