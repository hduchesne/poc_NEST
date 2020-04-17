(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['userinfo'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <img src='"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"profilePictureUrl") || (depth0 != null ? lookupProperty(depth0,"profilePictureUrl") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"profilePictureUrl","hash":{},"data":data,"loc":{"start":{"line":3,"column":18},"end":{"line":3,"column":39}}}) : helper)))
    + "' class='user-avatar img-fluid'/>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <img src='/modules/jexperience/images/default-profile.jpg' class='user-avatar img-fluid'/>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"col-md-4 \">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"profilePictureUrl") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":6,"column":11}}})) != null ? stack1 : "")
    + "</div>\n<div class=\"col-md-8\">\n    <div class=\"row\">\n      <div class=\"col text-uppercase text-primary\">\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"firstName") || (depth0 != null ? lookupProperty(depth0,"firstName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data,"loc":{"start":{"line":11,"column":8},"end":{"line":11,"column":21}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"lastName") || (depth0 != null ? lookupProperty(depth0,"lastName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data,"loc":{"start":{"line":11,"column":22},"end":{"line":11,"column":34}}}) : helper)))
    + "\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col\">\n        Pension ID:  "
    + alias4(((helper = (helper = lookupProperty(helpers,"pensionID") || (depth0 != null ? lookupProperty(depth0,"pensionID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pensionID","hash":{},"data":data,"loc":{"start":{"line":16,"column":21},"end":{"line":16,"column":34}}}) : helper)))
    + "\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col\">\n        Last logged in: today\n      </div>\n    </div>\n</div>";
},"useData":true});
})();