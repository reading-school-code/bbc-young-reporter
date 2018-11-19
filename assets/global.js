$(document).ready(function(){
    // include navbar
    $(".mdc-drawer").load("/page-inserts/navbar.html", function(){
        // initiate MDC drawer
        const drawer = new mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

        // include top app bar
        $(".mdc-top-app-bar").load("/page-inserts/top-app-bar.html", function(){
            // initiate MDC top app bar
            const mdc_top_app_bar = new mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));
            setScrollTarget(document.getElementById('main-content'), mdc_top_app_bar);

            mdc_top_app_bar.listen('MDCTopAppBar:nav', () => {
                drawer.open = !drawer.open;
            });

            // initiate MDC items
            mdc.autoInit();

            // get current URL with no forward slash at the end and no domain
            var drawer_item_link_query_selector = ".mdc-list-item[href='" + window.location.pathname;
            if (drawer_item_link_query_selector.endsWith("index.html")) {
                drawer_item_link_query_selector = drawer_item_link_query_selector.substring(0,drawer_item_link_query_selector.length - 10);
            }
            if (drawer_item_link_query_selector.endsWith("/")) {
                drawer_item_link_query_selector = drawer_item_link_query_selector.substring(0,drawer_item_link_query_selector.length - 1);
            }

            // set top app bar title
            $(".mdc-top-app-bar__title").html(window.page_title);

            // give 'seleted' styling to correct item on navbar
            $(drawer_item_link_query_selector + "']").addClass("mdc-list-item--activated");
            $(drawer_item_link_query_selector + "']").attr("aria-selected", "true");
            $(drawer_item_link_query_selector + "/']").addClass("mdc-list-item--activated");
            $(drawer_item_link_query_selector + "/']").attr("aria-selected", "true");
        });
    });

    // initiate timeago elements (displays how long ago an article was written)
    jQuery("time.timeago").timeago();

    // include cookie notice
    if(Cookies.get("reading-school-bbc-school-report-cookies-accepted") != "true") {
        $("#cookies").load("/page-inserts/cookie-notice.html", function(){
            $("#cookies").show();
            $("#cookies").animate({bottom: "0px"}, 1000);
            $(".source-code-link").animate({bottom: "100px"}, 1000);
            $("#close-cookies").click(function(){
                event.preventDefault();
                $("#cookies").animate({bottom: "-100px"}, 1000);
                setTimeout(function(){$("#cookies").hide()},1000);
                $(".source-code-link").animate({bottom: "15px"}, 1000);
                Cookies.set("reading-school-bbc-school-report-cookies-accepted", "true", {expires: 30});
            });
        });
    }
});
