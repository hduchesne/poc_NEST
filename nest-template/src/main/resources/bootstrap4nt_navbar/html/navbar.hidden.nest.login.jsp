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
        <button type="button" class="btn btn-primary btn-nest my-2 my-sm-0" data-toggle="modal" data-target="#loginModal">
            <fmt:message key="login-form.label.login"/>
        </button>
<%--    </li>--%>
<%--</ul>--%>

<%--<form class="form-inline">--%>
<%--    <button class="btn btn-nest my-2 my-sm-0" type="submit"> <fmt:message key="login-form.label.login"/></button>--%>
<%--</form>--%>

<div class="modal modal-nest fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true" <c:if test="${showModal}">data-show='true'</c:if>>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
<%--                <h5 class="modal-title" id="loginModalLabel">--%>
<%--                    <fmt:message key="login-form.label.login"/>--%>
<%--                </h5>--%>
                <button type="button" class="close text-primary" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                        <i class="fa fa-arrow-left"></i>
                    </span>
                </button>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div class="col-6">
                        <c:if test="${not empty param['loginError']}">
                            <div class="alert text-danger">
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


                        <h4 class="text-primary text-uppercase"><fmt:message key="login-form.title.login"/></h4>
                        <h5 class="text-primary text-uppercase">Please enter your log in details</h5>
                        <p>Enter your username and password to log in to your online account.</p>
                        <ui:loginArea>
<%--                        <form method="post" name="loginForm" action="/cms/login">--%>
<%--                            <input type="hidden" name="site" value="nest">--%>
<%--                            <input type="hidden" name="redirect" value="/sites/nest/home.html">--%>
<%--                            <input type="hidden" name="failureRedirect" value="/sites/nest/home.html">--%>

                            <div class="form-group">
                                <label for="username" class="text-primary text-uppercase"><fmt:message key="login-form.label.username"/></label>
                                <input type="text" class="form-control" name="username" id="username" placeholder="<fmt:message key="login-form.placeholder.username"/>">
                            </div>

                            <div class="form-group">
                                <label for="password" class="text-primary text-uppercase"><fmt:message key="login-form.label.password"/></label>
                                <input type="password" class="form-control" name="password" id="password" placeholder="<fmt:message key="login-form.placeholder.password"/>">
                            </div>
                            <p>Forgotten your username and/or your password?
                                <span class="text-primary d-block">Reset your log in details</span>
                            </p>
                            <button type="submit" class="btn btn-primary btn-nest text-uppercase"><fmt:message key="login-form.btn.login"/></button>
<%--                        </form>--%>
                        </ui:loginArea>
                    </div>
                    <div class="col-6">
                        <template:module path="*"/>
                        <h4 class="text-primary text-uppercase"><fmt:message key="login-form.title.account"/></h4>
                        <h5 class="text-primary text-uppercase">New to us? Activate your account here</h5>
                        <p>If you're new to us and haven't set up your online account yet, you can register below.</p>
                        <a class="btn btn-outline-primary btn-nest text-primary text-uppercase"><fmt:message key="login-form.btn.activate"/></a>
                    </div>
                </div>
            </div>

            <div class="modal-footer"></div>

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