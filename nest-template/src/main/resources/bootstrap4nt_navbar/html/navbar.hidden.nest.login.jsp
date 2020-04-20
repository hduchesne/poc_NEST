<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="ui" uri="http://www.jahia.org/tags/uiComponentsLib" %>
<%@ taglib prefix="utility" uri="http://www.jahia.org/tags/utilityLib" %>
<%@ taglib prefix="user" uri="http://www.jahia.org/tags/user" %>
<%@ taglib prefix="functions" uri="http://www.jahia.org/tags/functions" %>
<%--@elvariable id="currentUser" type="org.jahia.services.usermanager.JahiaUser"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>

<c:set var="showModal" value="${not empty param['loginError'] ? 'true' : 'false'}"/>
<utility:logger level="info" value="loginError : ${param['loginError']}"/>

<%--<c:set var="loginMenuULClass" value="${currentNode.properties.loginMenuULClass.string}"/>--%>
<%--<c:if test="${empty loginMenuULClass}">--%>
<%--    <c:set var="loginMenuULClass" value="navbar-nav flex-row ml-md-auto d-none d-md-flex"/>--%>
<%--</c:if>--%>

<%--<ul class="${loginMenuULClass}">--%>
<%--    <li class="nav-item">--%>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">
            <fmt:message key="login-form.label.login"/>
        </button>
<%--    </li>--%>
<%--</ul>--%>

<%--<form class="form-inline">--%>
<%--    <button class="btn btn-primary-nest my-2 my-sm-0" type="submit"> <fmt:message key="login-form.label.login"/></button>--%>
<%--</form>--%>

<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true" <c:if test="${showModal}">data-show='true'</c:if>>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="loginModalLabel">
                    <fmt:message key="login-form.label.login"/>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

<%--            <ui:loginArea>--%>
            <form method="post" name="loginForm" action="/cms/login">
                <input type="hidden" name="site" value="nest">
                <input type="hidden" name="redirect" value="/sites/nest/home-loggedin.html">
                <input type="hidden" name="failureRedirect" value="/sites/nest/home.html">


                <div class="modal-body">

                    <div class="row">
                        <div class="col-sm-12">
                            <c:if test="${not empty param['loginError']}">
                                <div class="alert alert-error">
                                    <c:choose>
                                        <c:when test="${param['loginError'] == 'account_locked'}">
                                            <fmt:message key="login-form.message.accountLocked" />
                                        </c:when>
                                        <c:when test="${param['loginError'] == 'logged_in_users_limit_reached'}">
                                            <fmt:message key="login-form.message.userLimitReached"/>
                                        </c:when>
                                        <c:otherwise>
                                            <fmt:message key="login-form.message.incorrectLogin" />
                                        </c:otherwise>
                                    </c:choose>
                                </div>
                            </c:if>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="username">
                                        <fmt:message key="login-form.label.username"/>
                                    </label>
                                </div>
                                <input class="form-control" id="username" name="username"
                                       type="text" placeholder='<fmt:message key="login-form.label.username"/>'/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="password">
                                        <fmt:message key="login-form.label.password"/>
                                    </label>
                                </div>
                                <input class="form-control" name="password" id="password"
                                       type="password" placeholder='<fmt:message key="login-form.label.password"/>'' autocomplete="off"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"><fmt:message key="login-form.label.cancel"/></button>
                    <button type="submit" class="btn btn-primary"><fmt:message key="login-form.label.login"/></button>
                </div>
            </form>
<%--            </ui:loginArea>--%>
        </div>
    </div>
</div>

<c:if test="${showModal == 'true'}">
    <script type="text/javascript">
        $(function(){
            $('#loginModal').modal();
        } )
    </script>
</c:if>