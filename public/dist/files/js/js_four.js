/*!
* Bootstrap.js by @fat & @mdo
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(e) {
    e(function() {
        "use strict";
        e.support.transition = function() {
            var e = function() {
                var e = document.createElement("bootstrap"), t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                }, n;
                for (n in t)
                    if (e.style[n] !== undefined)
                        return t[n]
            }();
            return e && {
                end: e
            }
        }()
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = '[data-dismiss="alert"]', n = function(n) {
        e(n).on("click", t, this.close)
    };
    n.prototype.close = function(t) {
        function s() {
            i.trigger("closed").remove()
        }
        var n = e(this), r = n.attr("data-target"), i;
        r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), i = e(r), t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = e.Event("close"));
        if (t.isDefaultPrevented())
            return;
        i.removeClass("in"), e.support.transition && i.hasClass("fade") ? i.on(e.support.transition.end, s) : s()
    }, e.fn.alert = function(t) {
        return this.each(function() {
            var r = e(this), i = r.data("alert");
            i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e(function() {
        e("body").on("click.alert.data-api", t, n.prototype.close)
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function(e) {
        var t = "disabled", n = this.$element, r = n.data(), i = n.is("input") ? "val": "html";
        e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function() {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function() {
        var e = this.$element.parent('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    }, e.fn.button = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("button"), s = typeof n == "object" && n;
            i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {
        loadingText: "loading..."
    }, e.fn.button.Constructor = t, e(function() {
        e("body").on("click.button.data-api", "[data-toggle^=button]", function(t) {
            var n = e(t.target);
            n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
        })
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = n, this.options.slide && this.slide(this.options.slide), this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.prototype = {
        cycle: function(t) {
            return t || (this.paused=!1), this.options.interval&&!this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
        },
        to: function(t) {
            var n = this.$element.find(".item.active"), r = n.parent().children(), i = r.index(n), s = this;
            if (t > r.length - 1 || t < 0)
                return;
            return this.sliding ? this.$element.one("slid", function() {
                s.to(t)
            }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", e(r[t]))
        },
        pause: function(t) {
            return t || (this.paused=!0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
        },
        next: function() {
            if (this.sliding)
                return;
            return this.slide("next")
        },
        prev: function() {
            if (this.sliding)
                return;
            return this.slide("prev")
        },
        slide: function(t, n) {
            var r = this.$element.find(".item.active"), i = n || r[t](), s = this.interval, o = t == "next" ? "left": "right", u = t == "next" ? "first": "last", a = this, f = e.Event("slide", {
                relatedTarget: i[0]
            });
            this.sliding=!0, s && this.pause(), i = i.length ? i : this.$element.find(".item")[u]();
            if (i.hasClass("active"))
                return;
            if (e.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())
                    return;
                i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), this.$element.one(e.support.transition.end, function() {
                    i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding=!1, setTimeout(function() {
                        a.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())
                    return;
                r.removeClass("active"), i.addClass("active"), this.sliding=!1, this.$element.trigger("slid")
            }
            return s && this.cycle(), this
        }
    }, e.fn.carousel = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("carousel"), s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n), o = typeof n == "string" ? n: s.slide;
            i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.cycle()
        })
    }, e.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, e.fn.carousel.Constructor = t, e(function() {
        e("body").on("click.carousel.data-api", "[data-slide]", function(t) {
            var n = e(this), r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")), s=!i.data("modal") && e.extend({}, i.data(), n.data());
            i.carousel(s), t.preventDefault()
        })
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t,
        dimension: function() {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        },
        show: function() {
            var t, n, r, i;
            if (this.transitioning)
                return;
            t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (r && r.length) {
                i = r.data("collapse");
                if (i && i.transitioning)
                    return;
                r.collapse("hide"), i || r.data("collapse", null)
            }
            this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
        },
        hide: function() {
            var t;
            if (this.transitioning)
                return;
            t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
        },
        reset: function(e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass": "removeClass"]("collapse"), this
        },
        transition: function(t, n, r) {
            var i = this, s = function() {
                n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
            };
            this.$element.trigger(n);
            if (n.isDefaultPrevented())
                return;
            this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
        },
        toggle: function() {
            this[this.$element.hasClass("in") ? "hide": "show"]()
        }
    }, e.fn.collapse = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("collapse"), s = typeof n == "object" && n;
            i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.collapse.defaults = {
        toggle: !0
    }, e.fn.collapse.Constructor = t, e(function() {
        e("body").on("click.collapse.data-api", "[data-toggle=collapse]", function(t) {
            var n = e(this), r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""), s = e(i).data("collapse") ? "toggle": n.data();
            n[e(i).hasClass("in") ? "addClass": "removeClass"]("collapsed"), e(i).collapse(s)
        })
    })
}(window.jQuery), !function(e) {
    "use strict";
    function r() {
        i(e(t)).removeClass("open")
    }
    function i(t) {
        var n = t.attr("data-target"), r;
        return n || (n = t.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), r = e(n), r.length || (r = t.parent()), r
    }
    var t = "[data-toggle=dropdown]", n = function(t) {
        var n = e(t).on("click.dropdown.data-api", this.toggle);
        e("html").on("click.dropdown.data-api", function() {
            n.parent().removeClass("open")
        })
    };
    n.prototype = {
        constructor: n,
        toggle: function(t) {
            var n = e(this), s, o;
            if (n.is(".disabled, :disabled"))
                return;
            return s = i(n), o = s.hasClass("open"), r(), o || (s.toggleClass("open"), n.focus()), !1
        },
        keydown: function(t) {
            var n, r, s, o, u, a;
            if (!/(38|40|27)/.test(t.keyCode))
                return;
            n = e(this), t.preventDefault(), t.stopPropagation();
            if (n.is(".disabled, :disabled"))
                return;
            o = i(n), u = o.hasClass("open");
            if (!u || u && t.keyCode == 27)
                return n.click();
            r = e("[role=menu] li:not(.divider) a", o);
            if (!r.length)
                return;
            a = r.index(r.filter(":focus")), t.keyCode == 38 && a > 0 && a--, t.keyCode == 40 && a < r.length - 1 && a++, ~a || (a = 0), r.eq(a).focus()
        }
    }, e.fn.dropdown = function(t) {
        return this.each(function() {
            var r = e(this), i = r.data("dropdown");
            i || r.data("dropdown", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.dropdown.Constructor = n, e(function() {
        e("html").on("click.dropdown.data-api touchstart.dropdown.data-api", r), e("body").on("click.dropdown touchstart.dropdown.data-api", ".dropdown", function(e) {
            e.stopPropagation()
        }).on("click.dropdown.data-api touchstart.dropdown.data-api", t, n.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", t + ", [role=menu]", n.prototype.keydown)
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t,
        toggle: function() {
            return this[this.isShown ? "hide": "show"]()
        },
        show: function() {
            var t = this, n = e.Event("show");
            this.$element.trigger(n);
            if (this.isShown || n.isDefaultPrevented())
                return;
            e("body").addClass("modal-open"), this.isShown=!0, this.escape(), this.backdrop(function() {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1).focus(), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function() {
                    t.$element.trigger("shown")
                }) : t.$element.trigger("shown")
            })
        },
        hide: function(t) {
            t && t.preventDefault();
            var n = this;
            t = e.Event("hide"), this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented())
                return;
            this.isShown=!1, e("body").removeClass("modal-open"), this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
        },
        enforceFocus: function() {
            var t = this;
            e(document).on("focusin.modal", function(e) {
                t.$element[0] !== e.target&&!t.$element.has(e.target).length && t.$element.focus()
            })
        },
        escape: function() {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(t) {
                t.which == 27 && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var t = this, n = setTimeout(function() {
                t.$element.off(e.support.transition.end), t.hideModal()
            }, 500);
            this.$element.one(e.support.transition.end, function() {
                clearTimeout(n), t.hideModal()
            })
        },
        hideModal: function(e) {
            this.$element.hide().trigger("hidden"), this.backdrop()
        },
        removeBackdrop: function() {
            this.$backdrop.remove(), this.$backdrop = null
        },
        backdrop: function(t) {
            var n = this, r = this.$element.hasClass("fade") ? "fade": "";
            if (this.isShown && this.options.backdrop) {
                var i = e.support.transition && r;
                this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.options.backdrop != "static" && this.$backdrop.click(e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), i ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else
                !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, e.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : t && t()
        }
    }, e.fn.modal = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("modal"), s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.fn.modal.Constructor = t, e(function() {
        e("body").on("click.modal.data-api", '[data-toggle="modal"]', function(t) {
            var n = e(this), r = n.attr("href"), i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")), s = i.data("modal") ? "toggle": e.extend({
                remote: !/#/.test(r) && r
            }, i.data(), n.data());
            t.preventDefault(), i.modal(s).one("hide", function() {
                n.focus()
            })
        })
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t,
        init: function(t, n, r) {
            var i, s;
            this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled=!0, this.options.trigger == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : this.options.trigger != "manual" && (i = this.options.trigger == "hover" ? "mouseenter" : "focus", s = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this))), this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(t) {
            return t = e.extend({}, e.fn[this.type].defaults, t, this.$element.data()), t.delay && typeof t.delay == "number" && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        },
        enter: function(t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            if (!n.options.delay ||!n.options.delay.show)
                return n.show();
            clearTimeout(this.timeout), n.hoverState = "in", this.timeout = setTimeout(function() {
                n.hoverState == "in" && n.show()
            }, n.options.delay.show)
        },
        leave: function(t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            this.timeout && clearTimeout(this.timeout);
            if (!n.options.delay ||!n.options.delay.hide)
                return n.hide();
            n.hoverState = "out", this.timeout = setTimeout(function() {
                n.hoverState == "out" && n.hide()
            }, n.options.delay.hide)
        },
        show: function() {
            var e, t, n, r, i, s, o;
            if (this.hasContent() && this.enabled) {
                e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, t = /in/.test(s), e.remove().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).appendTo(t ? this.$element : document.body), n = this.getPosition(t), r = e[0].offsetWidth, i = e[0].offsetHeight;
                switch (t ? s.split(" ")[1] : s) {
                case"bottom":
                    o = {
                        top: n.top + n.height,
                        left: n.left + n.width / 2 - r / 2
                    };
                    break;
                case"top":
                    o = {
                        top: n.top - i,
                        left: n.left + n.width / 2 - r / 2
                    };
                    break;
                case"left":
                    o = {
                        top: n.top + n.height / 2 - i / 2,
                        left: n.left - r
                    };
                    break;
                case"right":
                    o = {
                        top: n.top + n.height / 2 - i / 2,
                        left: n.left + n.width
                    }
                }
                e.css(o).addClass(s).addClass("in")
            }
        },
        setContent: function() {
            var e = this.tip(), t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html": "text"](t), e.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function r() {
                var t = setTimeout(function() {
                    n.off(e.support.transition.end).remove()
                }, 500);
                n.one(e.support.transition.end, function() {
                    clearTimeout(t), n.remove()
                })
            }
            var t = this, n = this.tip();
            return n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? r() : n.remove(), this
        },
        fixTitle: function() {
            var e = this.$element;
            (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").removeAttr("title")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function(t) {
            return e.extend({}, t ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        },
        getTitle: function() {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
        },
        tip: function() {
            return this.$tip = this.$tip || e(this.options.template)
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function() {
            this.enabled=!0
        },
        disable: function() {
            this.enabled=!1
        },
        toggleEnabled: function() {
            this.enabled=!this.enabled
        },
        toggle: function() {
            this[this.tip().hasClass("in") ? "hide": "show"]()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }, e.fn.tooltip = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("tooltip"), s = typeof n == "object" && n;
            i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !0
    }
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
        constructor: t,
        setContent: function() {
            var e = this.tip(), t = this.getTitle(), n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html": "text"](t), e.find(".popover-content > *")[this.options.html ? "html": "text"](n), e.removeClass("fade top bottom left right in")
        },
        hasContent: function() {
            return this.getTitle() || this.getContent()
        },
        getContent: function() {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-content") || (typeof n.content == "function" ? n.content.call(t[0]) : n.content), e
        },
        tip: function() {
            return this.$tip || (this.$tip = e(this.options.template)), this.$tip
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }), e.fn.popover = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("popover"), s = typeof n == "object" && n;
            i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })
}(window.jQuery), !function(e) {
    "use strict";
    function t(t, n) {
        var r = e.proxy(this.process, this), i = e(t).is("body") ? e(window): e(t), s;
        this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll-spy.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
    }
    t.prototype = {
        constructor: t,
        refresh: function() {
            var t = this, n;
            this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function() {
                var t = e(this), n = t.data("target") || t.attr("href"), r = /^#\w/.test(n) && e(n);
                return r && r.length && [[r.position().top, n]] || null
            }).sort(function(e, t) {
                return e[0] - t[0]
            }).each(function() {
                t.offsets.push(this[0]), t.targets.push(this[1])
            })
        },
        process: function() {
            var e = this.$scrollElement.scrollTop() + this.options.offset, t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, n = t - this.$scrollElement.height(), r = this.offsets, i = this.targets, s = this.activeTarget, o;
            if (e >= n)
                return s != (o = i.last()[0]) && this.activate(o);
            for (o = r.length; o--;)
                s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
        },
        activate: function(t) {
            var n, r;
            this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        }
    }, e.fn.scrollspy = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("scrollspy"), s = typeof n == "object" && n;
            i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {
        offset: 10
    }, e(window).on("load", function() {
        e('[data-spy="scroll"]').each(function() {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t,
        show: function() {
            var t = this.element, n = t.closest("ul:not(.dropdown-menu)"), r = t.attr("data-target"), i, s, o;
            r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
            if (t.parent("li").hasClass("active"))
                return;
            i = n.find(".active a").last()[0], o = e.Event("show", {
                relatedTarget: i
            }), t.trigger(o);
            if (o.isDefaultPrevented())
                return;
            s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function() {
                t.trigger({
                    type: "shown",
                    relatedTarget: i
                })
            })
        },
        activate: function(t, n, r) {
            function o() {
                i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
            }
            var i = n.find("> .active"), s = r && e.support.transition && i.hasClass("fade");
            s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
        }
    }, e.fn.tab = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("tab");
            i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
        })
    }, e.fn.tab.Constructor = t, e(function() {
        e("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
            t.preventDefault(), e(this).tab("show")
        })
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.$menu = e(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown=!1, this.listen()
    };
    t.prototype = {
        constructor: t,
        select: function() {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(), this.hide()
        },
        updater: function(e) {
            return e
        },
        show: function() {
            var t = e.extend({}, this.$element.offset(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.css({
                top: t.top + t.height,
                left: t.left
            }), this.$menu.show(), this.shown=!0, this
        },
        hide: function() {
            return this.$menu.hide(), this.shown=!1, this
        },
        lookup: function(t) {
            var n;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (n = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, n ? this.process(n) : this)
        },
        process: function(t) {
            var n = this;
            return t = e.grep(t, function(e) {
                return n.matcher(e)
            }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function(e) {
            return ~e.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(e) {
            var t = [], n = [], r = [], i;
            while (i = e.shift())
                i.toLowerCase().indexOf(this.query.toLowerCase())?~i.indexOf(this.query) ? n.push(i) : r.push(i) : t.push(i);
            return t.concat(n, r)
        },
        highlighter: function(e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(new RegExp("(" + t + ")", "ig"), function(e, t) {
                return "<strong>" + t + "</strong>"
            })
        },
        render: function(t) {
            var n = this;
            return t = e(t).map(function(t, r) {
                return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        },
        next: function(t) {
            var n = this.$menu.find(".active").removeClass("active"), r = n.next();
            r.length || (r = e(this.$menu.find("li")[0])), r.addClass("active")
        },
        prev: function(e) {
            var t = this.$menu.find(".active").removeClass("active"), n = t.prev();
            n.length || (n = this.$menu.find("li").last()), n.addClass("active")
        },
        listen: function() {
            this.$element.on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), (e.browser.webkit || e.browser.msie) && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this))
        },
        move: function(e) {
            if (!this.shown)
                return;
            switch (e.keyCode) {
            case 9:
            case 13:
            case 27:
                e.preventDefault();
                break;
            case 38:
                e.preventDefault(), this.prev();
                break;
            case 40:
                e.preventDefault(), this.next()
            }
            e.stopPropagation()
        },
        keydown: function(t) {
            this.suppressKeyPressRepeat=!~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
        },
        keypress: function(e) {
            if (this.suppressKeyPressRepeat)
                return;
            this.move(e)
        },
        keyup: function(e) {
            switch (e.keyCode) {
            case 40:
            case 38:
                break;
            case 9:
            case 13:
                if (!this.shown)
                    return;
                this.select();
                break;
            case 27:
                if (!this.shown)
                    return;
                this.hide();
                break;
            default:
                this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        },
        blur: function(e) {
            var t = this;
            setTimeout(function() {
                t.hide()
            }, 150)
        },
        click: function(e) {
            e.stopPropagation(), e.preventDefault(), this.select()
        },
        mouseenter: function(t) {
            this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        }
    }, e.fn.typeahead = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("typeahead"), s = typeof n == "object" && n;
            i || r.data("typeahead", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, e.fn.typeahead.Constructor = t, e(function() {
        e("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(t) {
            var n = e(this);
            if (n.data("typeahead"))
                return;
            t.preventDefault(), n.typeahead(n.data())
        })
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)), this.$element = e(t), this.checkPosition()
    };
    t.prototype.checkPosition = function() {
        if (!this.$element.is(":visible"))
            return;
        var t = e(document).height(), n = this.$window.scrollTop(), r = this.$element.offset(), i = this.options.offset, s = i.bottom, o = i.top, u = "affix affix-top affix-bottom", a;
        typeof i != "object" && (s = o = i), typeof o == "function" && (o = i.top()), typeof s == "function" && (s = i.bottom()), a = this.unpin != null && n + this.unpin <= r.top?!1 : s != null && r.top + this.$element.height() >= t - s ? "bottom" : o != null && n <= o ? "top" : !1;
        if (this.affixed === a)
            return;
        this.affixed = a, this.unpin = a == "bottom" ? r.top - n : null, this.$element.removeClass(u).addClass("affix" + (a ? "-" + a : ""))
    }, e.fn.affix = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("affix"), s = typeof n == "object" && n;
            i || r.data("affix", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.defaults = {
        offset: 0
    }, e(window).on("load", function() {
        e('[data-spy="affix"]').each(function() {
            var t = e(this), n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(window.jQuery);;
/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a, b) {
    "use strict";
    function c(a) {
        this.callback = a, this.ticking=!1
    }
    function d(b) {
        return b && "undefined" != typeof a && (b === a || b.nodeType)
    }
    function e(a) {
        if (arguments.length <= 0)
            throw new Error("Missing arguments in extend function");
        var b, c, f = a || {};
        for (c = 1; c < arguments.length; c++) {
            var g = arguments[c] || {};
            for (b in g)
                f[b] = "object" != typeof f[b] || d(f[b]) ? f[b] || g[b] : e(f[b], g[b])
        }
        return f
    }
    function f(a) {
        return a === Object(a) ? a : {
            down: a,
            up: a
        }
    }
    function g(a, b) {
        b = e(b, g.options), this.lastKnownScrollY = 0, this.elem = a, this.debouncer = new c(this.update.bind(this)), this.tolerance = f(b.tolerance), this.classes = b.classes, this.offset = b.offset, this.scroller = b.scroller, this.initialised=!1, this.onPin = b.onPin, this.onUnpin = b.onUnpin, this.onTop = b.onTop, this.onNotTop = b.onNotTop
    }
    var h = {
        bind: !!function() {}.bind,
        classList: "classList"in b.documentElement,
        rAF: !!(a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame)
    };
    a.requestAnimationFrame = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame, c.prototype = {
        constructor: c,
        update: function() {
            this.callback && this.callback(), this.ticking=!1
        },
        requestTick: function() {
            this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking=!0)
        },
        handleEvent: function() {
            this.requestTick()
        }
    }, g.prototype = {
        constructor: g,
        init: function() {
            return g.cutsTheMustard ? (this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
        },
        destroy: function() {
            var a = this.classes;
            this.initialised=!1, this.elem.classList.remove(a.unpinned, a.pinned, a.top, a.initial), this.scroller.removeEventListener("scroll", this.debouncer, !1)
        },
        attachEvent: function() {
            this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised=!0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
        },
        unpin: function() {
            var a = this.elem.classList, b = this.classes;
            (a.contains(b.pinned) ||!a.contains(b.unpinned)) && (a.add(b.unpinned), a.remove(b.pinned), this.onUnpin && this.onUnpin.call(this))
        },
        pin: function() {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.unpinned) && (a.remove(b.unpinned), a.add(b.pinned), this.onPin && this.onPin.call(this))
        },
        top: function() {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.top) || (a.add(b.top), a.remove(b.notTop), this.onTop && this.onTop.call(this))
        },
        notTop: function() {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.notTop) || (a.add(b.notTop), a.remove(b.top), this.onNotTop && this.onNotTop.call(this))
        },
        getScrollY: function() {
            return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (b.documentElement || b.body.parentNode || b.body).scrollTop
        },
        getViewportHeight: function() {
            return a.innerHeight || b.documentElement.clientHeight || b.body.clientHeight
        },
        getDocumentHeight: function() {
            var a = b.body, c = b.documentElement;
            return Math.max(a.scrollHeight, c.scrollHeight, a.offsetHeight, c.offsetHeight, a.clientHeight, c.clientHeight)
        },
        getElementHeight: function(a) {
            return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight)
        },
        getScrollerHeight: function() {
            return this.scroller === a || this.scroller === b.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
        },
        isOutOfBounds: function(a) {
            var b = 0 > a, c = a + this.getViewportHeight() > this.getScrollerHeight();
            return b || c
        },
        toleranceExceeded: function(a, b) {
            return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b]
        },
        shouldUnpin: function(a, b) {
            var c = a > this.lastKnownScrollY, d = a >= this.offset;
            return c && d && b
        },
        shouldPin: function(a, b) {
            var c = a < this.lastKnownScrollY, d = a <= this.offset;
            return c && b || d
        },
        update: function() {
            var a = this.getScrollY(), b = a > this.lastKnownScrollY ? "down": "up", c = this.toleranceExceeded(a, b);
            this.isOutOfBounds(a) || (a <= this.offset ? this.top() : this.notTop(), this.shouldUnpin(a, c) ? this.unpin() : this.shouldPin(a, c) && this.pin(), this.lastKnownScrollY = a)
        }
    }, g.options = {
        tolerance: {
            up: 0,
            down: 0
        },
        offset: 0,
        scroller: a,
        classes: {
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned",
            top: "headroom--top",
            notTop: "headroom--not-top",
            initial: "headroom"
        }
    }, g.cutsTheMustard = "undefined" != typeof h && h.rAF && h.bind && h.classList, a.Headroom = g
}(window, document);;
/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a) {
    a && (a.fn.headroom = function(b) {
        return this.each(function() {
            var c = a(this), d = c.data("headroom"), e = "object" == typeof b && b;
            e = a.extend(!0, {}, Headroom.options, e), d || (d = new Headroom(this, e), d.init(), c.data("headroom", d)), "string" == typeof b && d[b]()
        })
    }, a("[data-headroom]").each(function() {
        var b = a(this);
        b.headroom(b.data())
    }))
}(window.Zepto || window.jQuery);;
// ==========================================================================
// Plyr
// plyr.js v1.1.2
// https://github.com/selz/plyr
// License: The MIT License (MIT)
// ==========================================================================
// Credits: http://paypal.github.io/accessible-html5-video-player/
// ==========================================================================

(function (api) {
    "use strict";

    // Globals
    var fullscreen, config;

    // Default config
    var defaults = {
        enabled: true,
        debug: false,
        seekTime: 10,
        volume: 5,
        click: true,
        tooltips: false,
        displayDuration: true,
        selectors: {
            container: ".player",
            controls: ".player-controls",
            labels: "[data-player] .sr-only, label .sr-only",
            buttons: {
                seek: "[data-player='seek']",
                play: "[data-player='play']",
                pause: "[data-player='pause']",
                restart: "[data-player='restart']",
                rewind: "[data-player='rewind']",
                forward: "[data-player='fast-forward']",
                mute: "[data-player='mute']",
                volume: "[data-player='volume']",
                captions: "[data-player='captions']",
                fullscreen: "[data-player='fullscreen']"
            },
            progress: {
                container: ".player-progress",
                buffer: ".player-progress-buffer",
                played: ".player-progress-played"
            },
            captions: ".player-captions",
            currentTime: ".player-current-time",
            duration: ".player-duration"
        },
        classes: {
            video: "player-video",
            videoWrapper: "player-video-wrapper",
            audio: "player-audio",
            stopped: "stopped",
            playing: "playing",
            muted: "muted",
            loading: "loading",
            tooltip: "player-tooltip",
            hidden: "sr-only",
            hover: "hover",
            captions: {
                enabled: "captions-enabled",
                active: "captions-active"
            },
            fullscreen: {
                enabled: "fullscreen-enabled",
                active: "fullscreen-active",
                hideControls: "fullscreen-hide-controls"
            }
        },
        captions: {
            defaultActive: false
        },
        fullscreen: {
            enabled: true,
            fallback: true,
            hideControls: true
        },
        storage: {
            enabled: true,
            key: "plyr_volume"
        },
        controls: ["restart", "rewind", "play", "fast-forward", "current-time", "duration", "mute", "volume", "captions", "fullscreen"],
        onSetup: function() {},
    };

    // Build the default HTML
    function _buildControls() {
        // Open and add the progress and seek elements
        var html = [
        "<div class='player-controls'>",
        "<div class='player-progress'>",
        "<label for='seek{id}' class='sr-only'>Seek</label>",
        "<input id='seek{id}' class='player-progress-seek' type='range' min='0' max='100' step='0.5' value='0' data-player='seek'>",
        "<progress class='player-progress-played' max='100' value='0'>",
        "<span>0</span>% played",
        "</progress>",
        "<progress class='player-progress-buffer' max='100' value='0'>",
        "<span>0</span>% buffered",
        "</progress>",
        "</div>",
        "<span class='player-controls-left span4'>"];

        // Restart button
        if (_inArray(config.controls, "restart")) {
            html.push(
            "<button type='button' data-player='restart'>",
            "<svg><use xlink:href='#icon-restart'></use></svg>",
            "<span class='sr-only'>Restart</span>",
            "</button>"
            );
        }

        // Rewind button
        if (_inArray(config.controls, "rewind")) {
            html.push(
            "<button type='button' data-player='rewind'>",
            "<svg><use xlink:href='#icon-rewind'></use></svg>",
            "<span class='sr-only'>Rewind {seektime} secs</span>",
            "</button>"
            );
        }

        // Play/pause button
        if (_inArray(config.controls, "play")) {
            html.push(
            "<button type='button' data-player='play'>",
            "<svg><use xlink:href='#icon-play'></use></svg>",
            "<span class='sr-only'>Play</span>",
            "</button>",
            "<button type='button' data-player='pause'>",
            "<svg><use xlink:href='#icon-pause'></use></svg>",
            "<span class='sr-only'>Pause</span>",
            "</button>"
            );
        }

        // Fast forward button
        if (_inArray(config.controls, "fast-forward")) {
            html.push(
            "<button type='button' data-player='fast-forward'>",
            "<svg><use xlink:href='#icon-fast-forward'></use></svg>",
            "<span class='sr-only'>Forward {seektime} secs</span>",
            "</button>"
            );
        }

        // Media current time display
        if (_inArray(config.controls, "current-time")) {
            html.push(
            "<span class='player-time'>",
            "<span class='sr-only'>Current time</span>",
            "<span class='player-current-time'>00:00</span>",
            "</span>"
            );
        }

        // Media duration display
        if (_inArray(config.controls, "duration")) {
            html.push(
            "<span class='player-time'>",
            "<span class='sr-only'>Duration</span>",
            "<span class='player-duration'>00:00</span>",
            "</span>"
            );
        }

        // Close left controls
        html.push(
        "</span>",
        "<span class='player-status span4' data-sr='wait 0.3s, no reset'></span>",
        "<span class='player-controls-right'>"
        );

        // Toggle mute button
        if (_inArray(config.controls, "mute")) {
            html.push(
            "<input class='inverted sr-only' id='mute{id}' type='checkbox' data-player='mute'>",
            "<label id='mute{id}' for='mute{id}'>",
            "<svg class='icon-muted'><use xlink:href='#icon-muted'></use></svg>",
            "<svg><use xlink:href='#icon-volume'></use></svg>",
            "<span class='sr-only'>Toggle Mute</span>",
            "</label>"
            );
        }

        // Volume range control
        if (_inArray(config.controls, "volume")) {
            html.push(
            "<label for='volume{id}' class='sr-only'>Volume</label>",
            "<input id='volume{id}' class='player-volume' type='range' min='0' max='10' value='5' data-player='volume'>"
            );
        }

        // Toggle captions button
        if (_inArray(config.controls, "captions")) {
            html.push(
            "<input class='sr-only' id='captions{id}' type='checkbox' data-player='captions'>",
            "<label for='captions{id}'>",
            "<svg class='icon-captions-on'><use xlink:href='#icon-captions-on'></use></svg>",
            "<svg><use xlink:href='#icon-captions-off'></use></svg>",
            "<span class='sr-only'>Toggle Captions</span>",
            "</label>"
            );
        }

        // Toggle fullscreen button
        if (_inArray(config.controls, "fullscreen")) {
            html.push(
            "<button type='button' data-player='fullscreen'>",
            "<svg class='icon-exit-fullscreen'><use xlink:href='#icon-exit-fullscreen'></use></svg>",
            "<svg><use xlink:href='#icon-enter-fullscreen'></use></svg>",
            "<span class='sr-only'>Toggle Fullscreen</span>",
            "</button>"
            );
        }

        // Close everything
        html.push(
        "<span class='player-nav'></span>",
        "</span>",
        "</div>"
        );

        return html.join("");
    }

    // Debugging
    function _log(text, error) {
        if (config.debug && window.console) {
            console[(error ? "error" : "log")](text);
        }
    }

    // Credits: http://paypal.github.io/accessible-html5-video-player/
    // Unfortunately, due to mixed support, UA sniffing is required
    function _browserSniff() {
        var nAgt = navigator.userAgent,
        name = navigator.appName,
        fullVersion = "" + parseFloat(navigator.appVersion),
        majorVersion = parseInt(navigator.appVersion, 10),
        nameOffset,
        verOffset,
        ix;

        // MSIE 11
        if ((navigator.appVersion.indexOf("Windows NT") !== - 1) && (navigator.appVersion.indexOf("rv:11") !== - 1)) {
            name = "IE";
            fullVersion = "11;";
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf("MSIE")) !== - 1) {
            name = "IE";
            fullVersion = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf("Chrome")) !== - 1) {
            name = "Chrome";
            fullVersion = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf("Safari")) !== - 1) {
            name = "Safari";
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf("Version")) !== - 1) {
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf("Firefox")) !== - 1) {
            name = "Firefox";
            fullVersion = nAgt.substring(verOffset + 8);
        }
        // In most other browsers, "name/version" is at the end of userAgent
        else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))) {
            name = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);

            if (name.toLowerCase() == name.toUpperCase()) {
                name = navigator.appName;
            }
        }
        // Trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(";")) !== - 1) {
            fullVersion = fullVersion.substring(0, ix);
        }
        if ((ix = fullVersion.indexOf(" ")) !== - 1) {
            fullVersion = fullVersion.substring(0, ix);
        }
        // Get major version
        majorVersion = parseInt("" + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion = "" + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // Return data
        return {
            name: name,
            version: majorVersion,
            ios: /(iPad|iPhone|iPod)/g.test(navigator.platform)
        };
    }

    // Check for mime type support against a player instance
    // Credits: http://diveintohtml5.info/everything.html
    // Related: http://www.leanbackplayer.com/test/h5mt.html
    function _supportMime(player, mimeType) {
        var media = player.media;

        // Only check video types for video players
        if (player.type == "video") {
            // Check type
            switch (mimeType) {
            case "video/webm":
                return !!(media.canPlayType && media.canPlayType("video/webm; codecs=\"vp8, vorbis\"").replace(/no/, ""));
            case "video/mp4":
                return !!(media.canPlayType && media.canPlayType("video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"").replace(/no/, ""));
            case "video/ogg":
                return !!(media.canPlayType && media.canPlayType("video/ogg; codecs=\"theora\"").replace(/no/, ""));
            }
        }

        // Only check audio types for audio players
        else if (player.type == "audio") {
            // Check type
            switch (mimeType) {
            case "audio/mpeg":
                return !!(media.canPlayType && media.canPlayType("audio/mpeg;").replace(/no/, ""));
            case "audio/ogg":
                return !!(media.canPlayType && media.canPlayType("audio/ogg; codecs=\"vorbis\"").replace(/no/, ""));
            case "audio/wav":
                return !!(media.canPlayType && media.canPlayType("audio/wav; codecs=\"1\"").replace(/no/, ""));
            }
        }

        // If we got this far, we're stuffed
        return false;
    }

    // Element exists in an array
    function _inArray(haystack, needle) {
        return Array.prototype.indexOf && (haystack.indexOf(needle) != - 1);
    }

    // Replace all
    function _replaceAll(string, find, replace) {
        return string.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"), replace);
    }

    // Wrap an element
    function _wrap(elements, wrapper) {
        // Convert `elements` to an array, if necessary.
        if (!elements.length) {
            elements = [elements];
        }

        // Loops backwards to prevent having to clone the wrapper on the
        // first element (see `child` below).
        for (var i = elements.length - 1; i >= 0; i--) {
            var child = (i > 0) ? wrapper.cloneNode(true) : wrapper;
            var element = elements[i];

            // Cache the current parent and sibling.
            var parent = element.parentNode;
            var sibling = element.nextSibling;

            // Wrap the element (is automatically removed from its current
            // parent).
            child.appendChild(element);

            // If the element had a sibling, insert the wrapper before
            // the sibling to maintain the HTML structure; otherwise, just
            // append it to the parent.
            if (sibling) {
                parent.insertBefore(child, sibling);
            } else {
                parent.appendChild(child);
            }
        }
    }

    // Remove an element
    function _remove(element) {
        element.parentNode.removeChild(element);
    }

    // Prepend child
    function _prependChild(parent, element) {
        parent.insertBefore(element, parent.firstChild);
    }

    // Set attributes
    function _setAttributes(element, attributes) {
        for (var key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }

    // Toggle class on an element
    function _toggleClass(element, name, state) {
        if (element) {
            if (element.classList) {
                element.classList[state ? "add" : "remove"](name);
            } else {
                var className = (" " + element.className + " ").replace(/\s+/g, " ").replace(" " + name + " ", "");
                element.className = className + (state ? " " + name : "");
            }
        }
    }

    // Toggle event
    function _toggleHandler(element, events, callback, toggle) {
        events = events.split(" ");

        // If a nodelist is passed, call itself on each node
        if (element instanceof NodeList) {
            for (var x = 0; x < element.length; x++) {
                if (element[x] instanceof Node) {
                    _toggleHandler(element[x], arguments[1], arguments[2], arguments[3]);
                }
            }
            return;
        }

        // If a single node is passed, bind the event listener
        for (var i = 0; i < events.length; i++) {
            element[toggle ? "addEventListener" : "removeEventListener"](events[i], callback, false);
        }
    }

    // Bind event
    function _on(element, events, callback) {
        if (element) {
            _toggleHandler(element, events, callback, true);
        }
    }

    // Unbind event
    function _off(element, events, callback) {
        if (element) {
            _toggleHandler(element, events, callback, false);
        }
    }

    // Trigger event
    function _triggerEvent(element, event) {
        // Create faux event
        var fauxEvent = document.createEvent("MouseEvents");

        // Set the event type
        fauxEvent.initEvent(event, true, true);

        // Dispatch the event
        element.dispatchEvent(fauxEvent);
    }

    // Toggle checkbox
    function _toggleCheckbox(event) {
        // Only listen for return key
        if (event.keyCode && event.keyCode != 13) {
            return true;
        }

        // Toggle the checkbox
        event.target.checked = !event.target.checked;

        // Trigger change event
        _triggerEvent(event.target, "change");
    }

    // Get percentage
    function _getPercentage(current, max) {
        if (current === 0 || max === 0 || isNaN(current) || isNaN(max)) {
            return 0;
        }
        return ((current / max) * 100).toFixed(2);
    }

    // Deep extend/merge two Objects
    // http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
    // Removed call to arguments.callee (used explicit function name instead)
    function _extend(destination, source) {
        for (var property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                _extend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    // Fullscreen API
    function _fullscreen() {
        var fullscreen = {
            supportsFullScreen: false,
            isFullScreen: function() {
                return false;
            },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: "",
            element: null,
            prefix: ""
        },
        browserPrefixes = "webkit moz o ms khtml".split(" ");

        // check for native support
        if (typeof document.cancelFullScreen != "undefined") {
            fullscreen.supportsFullScreen = true;
        } else {
            // check for fullscreen support by vendor prefix
            for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
                fullscreen.prefix = browserPrefixes[i];

                if (typeof document[fullscreen.prefix + "CancelFullScreen"] != "undefined") {
                    fullscreen.supportsFullScreen = true;
                    break;
                }
                // Special case for MS (when isn't it?)
                else if (typeof document.msExitFullscreen != "undefined" && document.msFullscreenEnabled) {
                    fullscreen.prefix = "ms";
                    fullscreen.supportsFullScreen = true;
                    break;
                }
            }
        }

        // Safari doesn't support the ALLOW_KEYBOARD_INPUT flag (for security) so set it to not supported
        // https://bugs.webkit.org/show_bug.cgi?id=121496
        if (fullscreen.prefix === "webkit" && !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
            fullscreen.supportsFullScreen = false;
        }

        // Update methods to do something useful
        if (fullscreen.supportsFullScreen) {
            // Yet again Microsoft awesomeness,
            // Sometimes the prefix is "ms", sometimes "MS" to keep you on your toes
            fullscreen.fullScreenEventName = (fullscreen.prefix == "ms" ? "MSFullscreenChange" : fullscreen.prefix + "fullscreenchange");

            fullscreen.isFullScreen = function(element) {
                if (typeof element == "undefined") {
                    element = document;
                }

                switch (this.prefix) {
                case "":
                    return document.fullscreenElement == element;
                default:
                    return document[this.prefix + "FullscreenElement"] == element;
                }
            };
            fullscreen.requestFullScreen = function(element) {
                return (this.prefix === "") ? element.requestFullScreen() : element[this.prefix + (this.prefix == "ms" ? "RequestFullscreen" : "RequestFullScreen")](this.prefix === "webkit" ? element.ALLOW_KEYBOARD_INPUT : null);
            };
            fullscreen.cancelFullScreen = function() {
                return (this.prefix === "") ? document.cancelFullScreen() : document[this.prefix + (this.prefix == "ms" ? "ExitFullscreen" : "CancelFullScreen")]();
            };
            fullscreen.element = function() {
                return (this.prefix === "") ? document.fullscreenElement : document[this.prefix + "FullscreenElement"];
            };
        }

        return fullscreen;
    }

    // Local storage
    function _storage() {
        var storage = {
            supported: (function() {
                try {
                    return "localStorage" in window && window.localStorage !== null;
                } catch (e) {
                    return false;
                }
            })()
        }
        return storage;
    }

    // Player instance
    function Plyr(container) {
        var player = this;
        player.container = container;

        // Captions functions
        // Seek the manual caption time and update UI
        function _seekManualCaptions(time) {
            // If it's not video, or we're using textTracks, bail.
            if (player.usingTextTracks || player.type !== "video" || !player.supported.full) {
                return;
            }

            // Reset subcount
            player.subcount = 0;

            // Check time is a number, if not use currentTime
            // IE has a bug where currentTime doesn't go to 0
            // https://twitter.com/Sam_Potts/status/573715746506731521
            time = typeof time === "number" ? time : player.media.currentTime;

            while (_timecodeMax(player.captions[player.subcount][0]) < time.toFixed(1)) {
                player.subcount++;
                if (player.subcount > player.captions.length - 1) {
                    player.subcount = player.captions.length - 1;
                    break;
                }
            }

            // Check if the next caption is in the current time range
            if (player.media.currentTime.toFixed(1) >= _timecodeMin(player.captions[player.subcount][0]) &&
            player.media.currentTime.toFixed(1) <= _timecodeMax(player.captions[player.subcount][0])) {
                player.currentCaption = player.captions[player.subcount][1];

                // Render the caption
                player.captionsContainer.innerHTML = player.currentCaption;
            } else {
                // Clear the caption
                player.captionsContainer.innerHTML = "";
            }
        }

        // Display captions container and button (for initialization)
        function _showCaptions() {
            // If there's no caption toggle, bail
            if (!player.buttons.captions) {
                return;
            }

            _toggleClass(player.container, config.classes.captions.enabled, true);

            if (config.captions.defaultActive) {
                _toggleClass(player.container, config.classes.captions.active, true);
                player.buttons.captions.checked = true;
            }
        }

        // Utilities for caption time codes
        function _timecodeMin(tc) {
            var tcpair = [];
            tcpair = tc.split(" --> ");
            return _subTcSecs(tcpair[0]);
        }
        function _timecodeMax(tc) {
            var tcpair = [];
            tcpair = tc.split(" --> ");
            return _subTcSecs(tcpair[1]);
        }
        function _subTcSecs(tc) {
            if (tc === null || tc === undefined) {
                return 0;
            } else {
                var tc1 = [],
                tc2 = [],
                seconds;
                tc1 = tc.split(",");
                tc2 = tc1[0].split(":");
                seconds = Math.floor(tc2[0] * 60 * 60) + Math.floor(tc2[1] * 60) + Math.floor(tc2[2]);
                return seconds;
            }
        }

        // Find all elements
        function _getElements(selector) {
            return player.container.querySelectorAll(selector);
        }

        // Find a single element
        function _getElement(selector) {
            return _getElements(selector)[0];
        }

        // Determine if we're in an iframe
        function _inFrame() {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        }

        // Insert controls
        function _injectControls() {
            // Make a copy of the html
            var html = config.html;

            // Insert custom video controls
            _log("Injecting custom controls.");

            // If no controls are specified, create default
            if (!html) {
                html = _buildControls();
            }

            // Replace seek time instances
            html = _replaceAll(html, "{seektime}", config.seekTime);

            // Replace all id references with random numbers
            html = _replaceAll(html, "{id}", Math.floor(Math.random() * (10000)));

            // Inject into the container
            player.container.insertAdjacentHTML("beforeend", html);

            // Setup tooltips
            if (config.tooltips) {
                var labels = _getElements(config.selectors.labels);

                for (var i = labels.length - 1; i >= 0; i--) {
                    var label = labels[i];

                    _toggleClass(label, config.classes.hidden, false);
                    _toggleClass(label, config.classes.tooltip, true);
                }
            }
        }

        // Find the UI controls and store references
        function _findElements() {
            try {
                player.controls = _getElement(config.selectors.controls);

                // Buttons
                player.buttons = {};
                player.buttons.seek = _getElement(config.selectors.buttons.seek);
                player.buttons.play = _getElement(config.selectors.buttons.play);
                player.buttons.pause = _getElement(config.selectors.buttons.pause);
                player.buttons.restart = _getElement(config.selectors.buttons.restart);
                player.buttons.rewind = _getElement(config.selectors.buttons.rewind);
                player.buttons.forward = _getElement(config.selectors.buttons.forward);
                player.buttons.fullscreen = _getElement(config.selectors.buttons.fullscreen);

                // Inputs
                player.buttons.mute = _getElement(config.selectors.buttons.mute);
                player.buttons.captions = _getElement(config.selectors.buttons.captions);
                player.checkboxes = _getElements("[type='checkbox']");

                // Progress
                player.progress = {};
                player.progress.container = _getElement(config.selectors.progress.container);

                // Progress - Buffering
                player.progress.buffer = {};
                player.progress.buffer.bar = _getElement(config.selectors.progress.buffer);
                player.progress.buffer.text = player.progress.buffer.bar && player.progress.buffer.bar.getElementsByTagName("span")[0];

                // Progress - Played
                player.progress.played = {};
                player.progress.played.bar = _getElement(config.selectors.progress.played);
                player.progress.played.text = player.progress.played.bar && player.progress.played.bar.getElementsByTagName("span")[0];

                // Volume
                player.volume = _getElement(config.selectors.buttons.volume);

                // Timing
                player.duration = _getElement(config.selectors.duration);
                player.currentTime = _getElement(config.selectors.currentTime);
                player.seekTime = _getElements(config.selectors.seekTime);

                return true;
            } catch (e) {
                _log("It looks like there's a problem with your controls html. Bailing.", true);

                // Restore native video controls
                player.media.setAttribute("controls", "");

                return false;
            }
        }

        // Setup aria attributes
        function _setupAria() {
            // If there's no play button, bail
            if (!player.buttons.play) {
                return;
            }

            // Find the current text
            var label = player.buttons.play.innerText || "Play";

            // If there's a media title set, use that for the label
            if (typeof(config.title) !== "undefined" && config.title.length) {
                label += ", " + config.title;
            }

            player.buttons.play.setAttribute("aria-label", label);
        }

        // Setup media
        function _setupMedia() {
            // If there's no media, bail
            if (!player.media) {
                _log("No audio or video element found!", true);
                return false;
            }

            if (player.supported.full) {
                // Remove native video controls
                player.media.removeAttribute("controls");

                // Add type class
                _toggleClass(player.container, config.classes[player.type], true);

                // If there's no autoplay attribute, assume the video is stopped and add state class
                _toggleClass(player.container, config.classes.stopped, (player.media.getAttribute("autoplay") === null));

                // Add iOS class
                if (player.browser.ios) {
                    _toggleClass(player.container, "ios", true);
                }

                // Inject the player wrapper
                if (player.type === "video") {
                    // Create the wrapper div
                    var wrapper = document.createElement("div");
                    wrapper.setAttribute("class", config.classes.videoWrapper);

                    // Wrap the video in a container
                    _wrap(player.media, wrapper);

                    // Cache the container
                    player.videoContainer = wrapper;
                }
            }

            // Autoplay
            if (player.media.getAttribute("autoplay") !== null) {
                _play();
            }
        }

        // Setup captions
        function _setupCaptions() {
            if (player.type === "video") {
                // Inject the container
                player.videoContainer.insertAdjacentHTML("afterbegin", "<div class='" + config.selectors.captions.replace(".", "") + "'></div>");

                // Cache selector
                player.captionsContainer = _getElement(config.selectors.captions);

                // Determine if HTML5 textTracks is supported
                player.usingTextTracks = false;
                if (player.media.textTracks) {
                    player.usingTextTracks = true;
                }

                // Get URL of caption file if exists
                var captionSrc = "",
                kind,
                children = player.media.childNodes;

                for (var i = 0; i < children.length; i++) {
                    if (children[i].nodeName.toLowerCase() === "track") {
                        kind = children[i].getAttribute("kind");
                        if (kind === "captions") {
                            captionSrc = children[i].getAttribute("src");
                        }
                    }
                }

                // Record if caption file exists or not
                player.captionExists = true;
                if (captionSrc === "") {
                    player.captionExists = false;
                    _log("No caption track found.");
                } else {
                    _log("Caption track found; URI: " + captionSrc);
                }

                // If no caption file exists, hide container for caption text
                if (!player.captionExists) {
                    _toggleClass(player.container, config.classes.captions.enabled);
                }
                // If caption file exists, process captions
                else {
                    // Turn off native caption rendering to avoid double captions
                    // This doesn't seem to work in Safari 7+, so the <track> elements are removed from the dom below
                    var tracks = player.media.textTracks;
                    for (var x = 0; x < tracks.length; x++) {
                        tracks[x].mode = "hidden";
                    }

                    // Enable UI
                    _showCaptions(player);

                    // If IE 10/11 or Firefox 31+ or Safari 7+, don"t use native captioning (still doesn"t work although they claim it"s now supported)
                    if ((player.browser.name === "IE" && player.browser.version === 10) ||
                    (player.browser.name === "IE" && player.browser.version === 11) ||
                    (player.browser.name === "Firefox" && player.browser.version >= 31) ||
                    (player.browser.name === "Safari" && player.browser.version >= 7)) {
                        // Debugging
                        _log("Detected IE 10/11 or Firefox 31+ or Safari 7+.");

                        // Set to false so skips to "manual" captioning
                        player.usingTextTracks = false;
                    }

                    // Rendering caption tracks
                    // Native support required - http://caniuse.com/webvtt
                    if (player.usingTextTracks) {
                        _log("TextTracks supported.");

                        for (var y = 0; y < tracks.length; y++) {
                            var track = tracks[y];

                            if (track.kind === "captions") {
                                _on(track, "cuechange", function() {
                                    // Clear container
                                    player.captionsContainer.innerHTML = "";

                                    // Display a cue, if there is one
                                    if (this.activeCues[0] && this.activeCues[0].hasOwnProperty("text")) {
                                        player.captionsContainer.appendChild(this.activeCues[0].getCueAsHTML());
                                    }
                                });
                            }
                        }
                    }
                    // Caption tracks not natively supported
                    else {
                        _log("TextTracks not supported so rendering captions manually.");

                        // Render captions from array at appropriate time
                        player.currentCaption = "";
                        player.captions = [];

                        if (captionSrc !== "") {
                            // Create XMLHttpRequest Object
                            var xhr = new XMLHttpRequest();

                            xhr.onreadystatechange = function() {
                                if (xhr.readyState === 4) {
                                    if (xhr.status === 200) {
                                        var records = [],
                                        record,
                                        req = xhr.responseText;

                                        records = req.split("\n\n");

                                        for (var r = 0; r < records.length; r++) {
                                            record = records[r];
                                            player.captions[r] = [];
                                            player.captions[r] = record.split("\n");
                                        }

                                        // Remove first element ("VTT")
                                        player.captions.shift();

                                        _log("Successfully loaded the caption file via AJAX.");
                                    } else {
                                        _log("There was a problem loading the caption file via AJAX.", true);
                                    }
                                }
                            }

                            xhr.open("get", captionSrc, true);

                            xhr.send();
                        }
                    }

                    // If Safari 7+, removing track from DOM [see "turn off native caption rendering" above]
                    if (player.browser.name === "Safari" && player.browser.version >= 7) {
                        _log("Safari 7+ detected; removing track from DOM.");

                        // Find all <track> elements
                        tracks = player.media.getElementsByTagName("track");

                        // Loop through and remove one by one
                        for (var t = 0; t < tracks.length; t++) {
                            player.media.removeChild(tracks[t]);
                        }
                    }
                }
            }
        }

        // Setup fullscreen
        function _setupFullscreen() {
            if (player.type === "video" && config.fullscreen.enabled) {
                // Check for native support
                var nativeSupport = fullscreen.supportsFullScreen;

                if (nativeSupport || (config.fullscreen.fallback && !_inFrame())) {
                    _log((nativeSupport ? "Native" : "Fallback") + " fullscreen enabled.");

                    // Add styling hook
                    _toggleClass(player.container, config.classes.fullscreen.enabled, true);
                } else {
                    _log("Fullscreen not supported and fallback disabled.");
                }

                // Set control hide class hook
                if (config.fullscreen.hideControls) {
                    _toggleClass(player.container, config.classes.fullscreen.hideControls, true);
                }
            }
        }

        // Play media
        function _play() {
            player.media.play();
        }

        // Pause media
        function _pause() {
            player.media.pause();
        }

        // Rewind
        function _rewind(seekTime) {
            // Use default if needed
            if (typeof seekTime !== "number") {
                seekTime = config.seekTime;
            }
            _seek(player.media.currentTime - seekTime);
        }

        // Fast forward
        function _forward(seekTime) {
            // Use default if needed
            if (typeof seekTime !== "number") {
                seekTime = config.seekTime;
            }
            _seek(player.media.currentTime + seekTime);
        }

        // Seek to time
        // The input parameter can be an event or a number
        function _seek(input) {
            var targetTime = 0;

            // Explicit position
            if (typeof input === "number") {
                targetTime = input;
            }
            // Event
            else if (typeof input === "object" && (input.type === "input" || input.type === "change")) {
                // It's the seek slider
                // Seek to the selected time
                targetTime = ((input.target.value / input.target.max) * player.media.duration);
            }

            // Normalise targetTime
            if (targetTime < 0) {
                targetTime = 0;
            } else if (targetTime > player.media.duration) {
                targetTime = player.media.duration;
            }

            // Set the current time
            // Try/catch incase the media isn't set and we're calling seek() from source() and IE moans
            try {
                player.media.currentTime = targetTime.toFixed(1);
            } catch (e) {}

            // Logging
            _log("Seeking to " + player.media.currentTime + " seconds");

            // Special handling for "manual" captions
            _seekManualCaptions(targetTime);
        }

        // Check playing state
        function _checkPlaying() {
            _toggleClass(player.container, config.classes.playing, !player.media.paused);
            _toggleClass(player.container, config.classes.stopped, player.media.paused);
        }

        // Toggle fullscreen
        function _toggleFullscreen(event) {
            // Check for native support
            var nativeSupport = fullscreen.supportsFullScreen;

            // If it's a fullscreen change event, it's probably a native close
            if (event && event.type === fullscreen.fullScreenEventName) {
                player.isFullscreen = fullscreen.isFullScreen(player.container);
            }
            // If there's native support, use it
            else if (nativeSupport) {
                // Request fullscreen
                if (!fullscreen.isFullScreen(player.container)) {
                    fullscreen.requestFullScreen(player.container);
                }
                // Bail from fullscreen
                else {
                    fullscreen.cancelFullScreen();
                }

                // Check if we're actually full screen (it could fail)
                player.isFullscreen = fullscreen.isFullScreen(player.container);
            } else {
                // Otherwise, it's a simple toggle
                player.isFullscreen = !player.isFullscreen;

                // Bind/unbind escape key
                if (player.isFullscreen) {
                    _on(document, "keyup", _handleEscapeFullscreen);
                    document.body.style.overflow = "hidden";
                } else {
                    _off(document, "keyup", _handleEscapeFullscreen);
                    document.body.style.overflow = "";
                }
            }

            // Set class hook
            _toggleClass(player.container, config.classes.fullscreen.active, player.isFullscreen);
        }

        // Bail from faux-fullscreen
        function _handleEscapeFullscreen(event) {
            // If it's a keypress and not escape, bail
            if ((event.which || event.charCode || event.keyCode) === 27 && player.isFullscreen) {
                _toggleFullscreen();
            }
        }

        // Set volume
        function _setVolume(volume) {
            // Bail if there's no volume element
            if (!player.volume) {
                return;
            }

            // Use default if needed
            if (typeof volume === "undefined") {
                if (config.storage.enabled && _storage().supported) {
                    volume = window.localStorage[config.storage.key] || config.volume;
                } else {
                    volume = config.volume;
                }
            }
            // Maximum is 10
            if (volume > 10) {
                volume = 10;
            }

            // If the controls are there
            if (player.supported.full) {
                player.volume.value = volume;
            }

            // Set the player volume
            player.media.volume = parseFloat(volume / 10);

            // Update the UI
            _checkMute();

            // Store the volume in storage
            if (config.storage.enabled && _storage().supported) {
                window.localStorage.setItem(config.storage.key, volume);
            }
        }

        // Mute
        function _toggleMute(muted) {
            // If the method is called without parameter, toggle based on current value
            if (typeof muted === "undefined") {
                muted = !player.media.muted;
            }

            // If the controls are there
            if (player.supported.full) {
                player.buttons.mute.checked = muted;
            }

            // Set mute on the player
            player.media.muted = muted;

            // Update UI
            _checkMute();
        }

        // Toggle captions
        function _toggleCaptions(show) {
            // If there's no full support, or there's no caption toggle
            if (!player.supported.full || !player.buttons.captions) {
                return;
            }

            // If the method is called without parameter, toggle based on current value
            if (typeof show === "undefined") {
                show = (player.container.className.indexOf(config.classes.captions.active) === - 1);
                player.buttons.captions.checked = show;
            }

            _toggleClass(player.container, config.classes.captions.active, show);
        }

        // Check mute state
        function _checkMute() {
            _toggleClass(player.container, config.classes.muted, (player.media.volume === 0 || player.media.muted));
        }

        // Check if media is loading
        function _checkLoading(event) {
            var loading = (event.type === "waiting");

            // Clear timer
            clearTimeout(player.loadingTimer);

            // Timer to prevent flicker when seeking
            player.loadingTimer = setTimeout(function() {
                _toggleClass(player.container, config.classes.loading, loading);
            }, (loading ? 250 : 0));
        }

        // Update <progress> elements
        function _updateProgress(event) {
            var progress = player.progress.played.bar,
            text = player.progress.played.text,
            value = 0;

            if (event) {
                switch (event.type) {
                    // Video playing
                case "timeupdate":
                case "seeking":
                    value = _getPercentage(player.media.currentTime, player.media.duration);

                    // Set seek range value only if it's a "natural" time event
                    if (event.type == "timeupdate" && player.buttons.seek) {
                        player.buttons.seek.value = value;
                    }

                    break;

                    // Events from seek range
                case "change":
                case "input":
                    value = event.target.value;
                    break;


                    // Check buffer status
                case "playing":
                case "progress":
                    progress = player.progress.buffer.bar;
                    text = player.progress.buffer.text;
                    value = (function() {
                        var buffered = player.media.buffered;

                        if (buffered.length) {
                            return _getPercentage(buffered.end(0), player.media.duration);
                        }

                        return 0;
                    })();
                    break;
                }
            }

            // Set values
            if (progress) {
                progress.value = value;
            }
            if (text) {
                text.innerHTML = value;
            }
        }

        // Update the displayed time
        function _updateTimeDisplay(time, element) {
            // Bail if there's no duration display
            if (!element) {
                return;
            }

            player.secs = parseInt(time % 60);
            player.mins = parseInt((time / 60) % 60);
            player.hours = parseInt(((time / 60) / 60) % 60);

            // Do we need to display hours?
            var displayHours = (parseInt(((player.media.duration / 60) / 60) % 60) > 0)
            // Ensure it"s two digits. For example, 03 rather than 3.
            player.secs = ("0" + player.secs).slice( - 2);
            player.mins = ("0" + player.mins).slice( - 2);

            // Render
            element.innerHTML = (displayHours ? player.hours + ":" : "") + player.mins + ":" + player.secs;
        }

        // Show the duration on metadataloaded
        function _displayDuration() {
            var duration = player.media.duration || 0;

            // If there's only one time display, display duration there
            if (!player.duration && config.displayDuration && player.media.paused) {
                _updateTimeDisplay(duration, player.currentTime);
            }

            // If there's a duration element, update content
            if (player.duration) {
                _updateTimeDisplay(duration, player.duration);
            }
        }

        // Handle time change event
        function _timeUpdate(event) {
            // Duration
            _updateTimeDisplay(player.media.currentTime, player.currentTime);

            // Playing progress
            _updateProgress(event);
        }

        // Remove <source> children and src attribute
        function _removeSources() {
            // Find child <source> elements
            var sources = player.media.querySelectorAll("source");

            // Remove each
            for (var i = sources.length - 1; i >= 0; i--) {
                _remove(sources[i]);
            }

            // Remove src attribute
            player.media.removeAttribute("src");
        }

        // Inject a source
        function _addSource(attributes) {
            if (attributes.src) {
                // Create a new <source>
                var element = document.createElement("source");

                // Set all passed attributes
                _setAttributes(element, attributes);

                // Inject the new source
                _prependChild(player.media, element);
            }
        }

        // Update source
        // Sources are not checked for support so be careful
        function _parseSource(sources) {
            // Pause playback (webkit freaks out)
            _pause();

            // Restart
            _seek();

            // Remove current sources
            _removeSources();

            // If a single source is passed
            // .source("path/to/video.mp4")
            if (typeof sources === "string") {
                player.media.setAttribute("src", sources);
            }

            // An array of source objects
            // Check if a source exists, use that or set the "src" attribute?
            // .source([{ src: "path/to/video.mp4", type: "video/mp4" },{ src: "path/to/video.webm", type: "video/webm" }])
            else if (sources.constructor === Array) {
                for (var index in sources) {
                    _addSource(sources[index]);
                }
            }

            if (player.supported.full) {
                // Reset time display
                _timeUpdate();

                // Update the UI
                _checkPlaying();
            }

            // Re-load sources
            player.media.load();

            // Play if autoplay attribute is present
            if (player.media.getAttribute("autoplay") !== null) {
                _play();
            }
        }

        // Update poster
        function _updatePoster(source) {
            if (player.type === "video") {
                player.media.setAttribute("poster", source);
            }
        }

        // Listen for events
        function _listeners() {
            // IE doesn't support input event, so we fallback to change
            var inputEvent = (player.browser.name == "IE" ? "change" : "input");

            // Play
            _on(player.buttons.play, "click", function() {
                _play();
                setTimeout(function() {
                    player.buttons.pause.focus();
                }, 100);
            });

            // Pause
            _on(player.buttons.pause, "click", function() {
                _pause();
                setTimeout(function() {
                    player.buttons.play.focus();
                }, 100);
            });

            // Restart
            _on(player.buttons.restart, "click", _seek);

            // Rewind
            _on(player.buttons.rewind, "click", _rewind);

            // Fast forward
            _on(player.buttons.forward, "click", _forward);

            // Seek
            _on(player.buttons.seek, inputEvent, _seek);

            // Set volume
            _on(player.volume, inputEvent, function() {
                _setVolume(this.value);
            });

            // Mute
            _on(player.buttons.mute, "change", function() {
                _toggleMute(this.checked);
            });

            // Fullscreen
            _on(player.buttons.fullscreen, "click", _toggleFullscreen);

            // Handle user exiting fullscreen by escaping etc
            if (fullscreen.supportsFullScreen) {
                _on(document, fullscreen.fullScreenEventName, _toggleFullscreen);
            }

            // Time change on media
            _on(player.media, "timeupdate seeking", _timeUpdate);

            // Update manual captions
            _on(player.media, "timeupdate", _seekManualCaptions);

            // Display duration
            _on(player.media, "loadedmetadata", _displayDuration);

            // Captions
            _on(player.buttons.captions, "change", function() {
                _toggleCaptions(this.checked);
            });

            // Handle the media finishing
            _on(player.media, "ended", function() {
                // Clear
                if (player.type === "video") {
                    player.captionsContainer.innerHTML = "";
                }

                // Reset UI
                _checkPlaying();
            });

            // Check for buffer progress
            _on(player.media, "progress", _updateProgress);

            // Also check on start of playing
            _on(player.media, "playing", _updateProgress);

            // Handle native mute
            _on(player.media, "volumechange", _checkMute);

            // Handle native play/pause
            _on(player.media, "play pause", _checkPlaying);

            // Loading
            _on(player.media, "waiting canplay seeked", _checkLoading);

            // Toggle checkboxes on return key (as they look like buttons)
            _on(player.checkboxes, "keyup", _toggleCheckbox);

            // Click video
            if (player.type === "video" && config.click) {
                _on(player.videoContainer, "click", function() {
                    if (player.media.paused) {
                        _play();
                    } else if (player.media.ended) {
                        _seek();
                        _play();
                    } else {
                        _pause();
                    }
                });
            }

            // Bind to mouse hover
            if (config.fullscreen.hideControls) {
                _on(player.controls, "mouseenter mouseleave", function(event) {
                    _toggleClass(player.controls, config.classes.hover, (event.type === "mouseenter"));
                })
            }
        }

        function _init() {
            // Setup the fullscreen api
            fullscreen = _fullscreen();

            // Sniff out the browser
            player.browser = _browserSniff();

            // Get the media element
            player.media = player.container.querySelectorAll("audio, video")[0];

            // Set media type
            player.type = player.media.tagName.toLowerCase();

            // Check for full support
            player.supported = api.supported(player.type);

            // If no native support, bail
            if (!player.supported.basic) {
                return false;
            }

            // Debug info
            _log(player.browser.name + " " + player.browser.version);

            // Setup media
            _setupMedia();

            // If there's full support
            if (player.supported.full) {
                // Inject custom controls
                _injectControls();

                // Find the elements
                if (!_findElements()) {
                    return false;
                }

                // Display duration if available
                if (config.displayDuration) {
                    _displayDuration();
                }

                // Set up aria-label for Play button with the title option
                _setupAria();

                // Captions
                _setupCaptions();

                // Set volume
                _setVolume();

                // Setup fullscreen
                _setupFullscreen();

                // Listeners
                _listeners();
            }

            // Successful setup
            return true;
        }

        if (!_init()) {
            return {};
        }

        return {
            media: player.media,
            play: _play,
            pause: _pause,
            restart: _seek,
            rewind: _rewind,
            forward: _forward,
            seek: _seek,
            source: _parseSource,
            poster: _updatePoster,
            setVolume: _setVolume,
            toggleMute: _toggleMute,
            toggleCaptions: _toggleCaptions,
            toggleFullscreen: _toggleFullscreen,
            isFullscreen: function() {
                return player.isFullscreen || false;
            },
            support: function(mimeType) {
                return _supportMime(player, mimeType);
            }
        }
    }

    // Check for support
    api.supported = function(type) {
        var browser = _browserSniff(),
        oldIE = (browser.name === "IE" && browser.version <= 9),
        iPhone = /iPhone|iPod/i.test(navigator.userAgent),
        audio = !!document.createElement("audio").canPlayType,
        video = !!document.createElement("video").canPlayType,
        basic, full;

        switch (type) {
        case "video":
            basic = video;
            full = (basic && (!oldIE && !iPhone));
            break;

        case "audio":
            basic = audio;
            full = (basic && !oldIE);
            break;

        default:
            basic = (audio && video);
            full = (basic && !oldIE);
            break;
        }

        return {
            basic: basic,
            full: full
        };
    }

    // Expose setup function
    api.setup = function(options) {
        // Extend the default options with user specified
        config = _extend(defaults, options);

        // Bail if disabled or no basic support
        // You may want to disable certain UAs etc
        if (!config.enabled || !api.supported().basic) {
            return false;
        }

        // Get the players
        var elements = document.querySelectorAll(config.selectors.container),
        players = [];

        // Create a player instance for each element
        for (var i = elements.length - 1; i >= 0; i--) {
            // Get the current element
            var element = elements[i];

            // Setup a player instance and add to the element
            if (typeof element.plyr === "undefined") {
                // Create new instance
                var instance = new Plyr(element);

                // Set plyr to false if setup failed
                element.plyr = (Object.keys(instance).length ? instance : false);

                // Callback
                config.onSetup.apply(element.plyr);
            }

            // Add to return array even if it's already setup
            players.push(element.plyr);
        }

        return players;
    }

}(this.plyr = this.plyr || {}));;
(function(a) {
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
}(function(f) {
    var p = "left", o = "right", e = "up", x = "down", c = "in", z = "out", m = "none", s = "auto", l = "swipe", t = "pinch", A = "tap", j = "doubletap", b = "longtap", y = "hold", D = "horizontal", u = "vertical", i = "all", r = 10, g = "start", k = "move", h = "end", q = "cancel", a = "ontouchstart" in window, v = window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled, d = window.navigator.pointerEnabled || window.navigator.msPointerEnabled, B = "TouchSwipe";
    var n = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe",
        preventDefaultEvents: true
    };
    f.fn.swipe = function(G) {
        var F = f(this), E = F.data(B);
        if (E && typeof G === "string") {
            if (E[G]) {
                return E[G].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                f.error("Method " + G + " does not exist on jQuery.swipe")
            }
        } else {
            if (!E && (typeof G === "object" ||!G)) {
                return w.apply(this, arguments)
            }
        }
        return F
    };
    f.fn.swipe.defaults = n;
    f.fn.swipe.phases = {
        PHASE_START: g,
        PHASE_MOVE: k,
        PHASE_END: h,
        PHASE_CANCEL: q
    };
    f.fn.swipe.directions = {
        LEFT: p,
        RIGHT: o,
        UP: e,
        DOWN: x,
        IN: c,
        OUT: z
    };
    f.fn.swipe.pageScroll = {
        NONE: m,
        HORIZONTAL: D,
        VERTICAL: u,
        AUTO: s
    };
    f.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: i
    };
    function w(E) {
        if (E && (E.allowPageScroll === undefined && (E.swipe !== undefined || E.swipeStatus !== undefined))) {
            E.allowPageScroll = m
        }
        if (E.click !== undefined && E.tap === undefined) {
            E.tap = E.click
        }
        if (!E) {
            E = {}
        }
        E = f.extend({}, f.fn.swipe.defaults, E);
        return this.each(function() {
            var G = f(this);
            var F = G.data(B);
            if (!F) {
                F = new C(this, E);
                G.data(B, F)
            }
        })
    }
    function C(a4, av) {
        var az = (a || d ||!av.fallbackToMouseEvents), J = az ? (d ? (v ? "MSPointerDown" : "pointerdown") : "touchstart"): "mousedown", ay = az ? (d ? (v ? "MSPointerMove" : "pointermove") : "touchmove"): "mousemove", U = az ? (d ? (v ? "MSPointerUp" : "pointerup") : "touchend"): "mouseup", S = az ? null: "mouseleave", aD = (d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel");
        var ag = 0, aP = null, ab = 0, a1 = 0, aZ = 0, G = 1, aq = 0, aJ = 0, M = null;
        var aR = f(a4);
        var Z = "start";
        var W = 0;
        var aQ = null;
        var T = 0, a2 = 0, a5 = 0, ad = 0, N = 0;
        var aW = null, af = null;
        try {
            aR.bind(J, aN);
            aR.bind(aD, a9)
        } catch (ak) {
            f.error("events not supported " + J + "," + aD + " on jQuery.swipe")
        }
        this.enable = function() {
            aR.bind(J, aN);
            aR.bind(aD, a9);
            return aR
        };
        this.disable = function() {
            aK();
            return aR
        };
        this.destroy = function() {
            aK();
            aR.data(B, null);
            aR = null
        };
        this.option = function(bc, bb) {
            if (av[bc] !== undefined) {
                if (bb === undefined) {
                    return av[bc]
                } else {
                    av[bc] = bb
                }
            } else {
                f.error("Option " + bc + " does not exist on jQuery.swipe.options")
            }
            return null
        };
        function aN(bd) {
            if (aB()) {
                return
            }
            if (f(bd.target).closest(av.excludedElements, aR).length > 0) {
                return
            }
            var be = bd.originalEvent ? bd.originalEvent: bd;
            var bc, bb = a ? be.touches[0]: be;
            Z = g;
            if (a) {
                W = be.touches.length
            } else {
                bd.preventDefault()
            }
            ag = 0;
            aP = null;
            aJ = null;
            ab = 0;
            a1 = 0;
            aZ = 0;
            G = 1;
            aq = 0;
            aQ = aj();
            M = aa();
            R();
            if (!a || (W === av.fingers || av.fingers === i) || aX()) {
                ai(0, bb);
                T = at();
                if (W == 2) {
                    ai(1, be.touches[1]);
                    a1 = aZ = au(aQ[0].start, aQ[1].start)
                }
                if (av.swipeStatus || av.pinchStatus) {
                    bc = O(be, Z)
                }
            } else {
                bc = false
            }
            if (bc === false) {
                Z = q;
                O(be, Z);
                return bc
            } else {
                if (av.hold) {
                    af = setTimeout(f.proxy(function() {
                        aR.trigger("hold", [be.target]);
                        if (av.hold) {
                            bc = av.hold.call(aR, be, be.target)
                        }
                    }, this), av.longTapThreshold)
                }
                ao(true)
            }
            return null
        }
        function a3(be) {
            var bh = be.originalEvent ? be.originalEvent: be;
            if (Z === h || Z === q || am()) {
                return
            }
            var bd, bc = a ? bh.touches[0]: bh;
            var bf = aH(bc);
            a2 = at();
            if (a) {
                W = bh.touches.length
            }
            if (av.hold) {
                clearTimeout(af)
            }
            Z = k;
            if (W == 2) {
                if (a1 == 0) {
                    ai(1, bh.touches[1]);
                    a1 = aZ = au(aQ[0].start, aQ[1].start)
                } else {
                    aH(bh.touches[1]);
                    aZ = au(aQ[0].end, aQ[1].end);
                    aJ = ar(aQ[0].end, aQ[1].end)
                }
                G = a7(a1, aZ);
                aq = Math.abs(a1 - aZ)
            }
            if ((W === av.fingers || av.fingers === i) ||!a || aX()) {
                aP = aL(bf.start, bf.end);
                al(be, aP);
                ag = aS(bf.start, bf.end);
                ab = aM();
                aI(aP, ag);
                if (av.swipeStatus || av.pinchStatus) {
                    bd = O(bh, Z)
                }
                if (!av.triggerOnTouchEnd || av.triggerOnTouchLeave) {
                    var bb = true;
                    if (av.triggerOnTouchLeave) {
                        var bg = aY(this);
                        bb = E(bf.end, bg)
                    }
                    if (!av.triggerOnTouchEnd && bb) {
                        Z = aC(k)
                    } else {
                        if (av.triggerOnTouchLeave&&!bb) {
                            Z = aC(h)
                        }
                    }
                    if (Z == q || Z == h) {
                        O(bh, Z)
                    }
                }
            } else {
                Z = q;
                O(bh, Z)
            }
            if (bd === false) {
                Z = q;
                O(bh, Z)
            }
        }
        function L(bb) {
            var bc = bb.originalEvent;
            if (a) {
                if (bc.touches.length > 0) {
                    F();
                    return true
                }
            }
            if (am()) {
                W = ad
            }
            a2 = at();
            ab = aM();
            if (ba() ||!an()) {
                Z = q;
                O(bc, Z)
            } else {
                if (av.triggerOnTouchEnd || (av.triggerOnTouchEnd == false && Z === k)) {
                    bb.preventDefault();
                    Z = h;
                    O(bc, Z)
                } else {
                    if (!av.triggerOnTouchEnd && a6()) {
                        Z = h;
                        aF(bc, Z, A)
                    } else {
                        if (Z === k) {
                            Z = q;
                            O(bc, Z)
                        }
                    }
                }
            }
            ao(false);
            return null
        }
        function a9() {
            W = 0;
            a2 = 0;
            T = 0;
            a1 = 0;
            aZ = 0;
            G = 1;
            R();
            ao(false)
        }
        function K(bb) {
            var bc = bb.originalEvent;
            if (av.triggerOnTouchLeave) {
                Z = aC(h);
                O(bc, Z)
            }
        }
        function aK() {
            aR.unbind(J, aN);
            aR.unbind(aD, a9);
            aR.unbind(ay, a3);
            aR.unbind(U, L);
            if (S) {
                aR.unbind(S, K)
            }
            ao(false)
        }
        function aC(bf) {
            var be = bf;
            var bd = aA();
            var bc = an();
            var bb = ba();
            if (!bd || bb) {
                be = q
            } else {
                if (bc && bf == k && (!av.triggerOnTouchEnd || av.triggerOnTouchLeave)) {
                    be = h
                } else {
                    if (!bc && bf == h && av.triggerOnTouchLeave) {
                        be = q
                    }
                }
            }
            return be
        }
        function O(bd, bb) {
            var bc = undefined;
            if ((I() || V()) || (P() || aX())) {
                if (I() || V()) {
                    bc = aF(bd, bb, l)
                }
                if ((P() || aX()) && bc !== false) {
                    bc = aF(bd, bb, t)
                }
            } else {
                if (aG() && bc !== false) {
                    bc = aF(bd, bb, j)
                } else {
                    if (ap() && bc !== false) {
                        bc = aF(bd, bb, b)
                    } else {
                        if (ah() && bc !== false) {
                            bc = aF(bd, bb, A)
                        }
                    }
                }
            }
            if (bb === q) {
                a9(bd)
            }
            if (bb === h) {
                if (a) {
                    if (bd.touches.length == 0) {
                        a9(bd)
                    }
                } else {
                    a9(bd)
                }
            }
            return bc
        }
        function aF(be, bb, bd) {
            var bc = undefined;
            if (bd == l) {
                aR.trigger("swipeStatus", [bb, aP || null, ag || 0, ab || 0, W, aQ]);
                if (av.swipeStatus) {
                    bc = av.swipeStatus.call(aR, be, bb, aP || null, ag || 0, ab || 0, W, aQ);
                    if (bc === false) {
                        return false
                    }
                }
                if (bb == h && aV()) {
                    aR.trigger("swipe", [aP, ag, ab, W, aQ]);
                    if (av.swipe) {
                        bc = av.swipe.call(aR, be, aP, ag, ab, W, aQ);
                        if (bc === false) {
                            return false
                        }
                    }
                    switch (aP) {
                    case p:
                        aR.trigger("swipeLeft", [aP, ag, ab, W, aQ]);
                        if (av.swipeLeft) {
                            bc = av.swipeLeft.call(aR, be, aP, ag, ab, W, aQ)
                        }
                        break;
                    case o:
                        aR.trigger("swipeRight", [aP, ag, ab, W, aQ]);
                        if (av.swipeRight) {
                            bc = av.swipeRight.call(aR, be, aP, ag, ab, W, aQ)
                        }
                        break;
                    case e:
                        aR.trigger("swipeUp", [aP, ag, ab, W, aQ]);
                        if (av.swipeUp) {
                            bc = av.swipeUp.call(aR, be, aP, ag, ab, W, aQ)
                        }
                        break;
                    case x:
                        aR.trigger("swipeDown", [aP, ag, ab, W, aQ]);
                        if (av.swipeDown) {
                            bc = av.swipeDown.call(aR, be, aP, ag, ab, W, aQ)
                        }
                        break
                    }
                }
            }
            if (bd == t) {
                aR.trigger("pinchStatus", [bb, aJ || null, aq || 0, ab || 0, W, G, aQ]);
                if (av.pinchStatus) {
                    bc = av.pinchStatus.call(aR, be, bb, aJ || null, aq || 0, ab || 0, W, G, aQ);
                    if (bc === false) {
                        return false
                    }
                }
                if (bb == h && a8()) {
                    switch (aJ) {
                    case c:
                        aR.trigger("pinchIn", [aJ || null, aq || 0, ab || 0, W, G, aQ]);
                        if (av.pinchIn) {
                            bc = av.pinchIn.call(aR, be, aJ || null, aq || 0, ab || 0, W, G, aQ)
                        }
                        break;
                    case z:
                        aR.trigger("pinchOut", [aJ || null, aq || 0, ab || 0, W, G, aQ]);
                        if (av.pinchOut) {
                            bc = av.pinchOut.call(aR, be, aJ || null, aq || 0, ab || 0, W, G, aQ)
                        }
                        break
                    }
                }
            }
            if (bd == A) {
                if (bb === q || bb === h) {
                    clearTimeout(aW);
                    clearTimeout(af);
                    if (Y()&&!H()) {
                        N = at();
                        aW = setTimeout(f.proxy(function() {
                            N = null;
                            aR.trigger("tap", [be.target]);
                            if (av.tap) {
                                bc = av.tap.call(aR, be, be.target)
                            }
                        }, this), av.doubleTapThreshold)
                    } else {
                        N = null;
                        aR.trigger("tap", [be.target]);
                        if (av.tap) {
                            bc = av.tap.call(aR, be, be.target)
                        }
                    }
                }
            } else {
                if (bd == j) {
                    if (bb === q || bb === h) {
                        clearTimeout(aW);
                        N = null;
                        aR.trigger("doubletap", [be.target]);
                        if (av.doubleTap) {
                            bc = av.doubleTap.call(aR, be, be.target)
                        }
                    }
                } else {
                    if (bd == b) {
                        if (bb === q || bb === h) {
                            clearTimeout(aW);
                            N = null;
                            aR.trigger("longtap", [be.target]);
                            if (av.longTap) {
                                bc = av.longTap.call(aR, be, be.target)
                            }
                        }
                    }
                }
            }
            return bc
        }
        function an() {
            var bb = true;
            if (av.threshold !== null) {
                bb = ag >= av.threshold
            }
            return bb
        }
        function ba() {
            var bb = false;
            if (av.cancelThreshold !== null && aP !== null) {
                bb = (aT(aP) - ag) >= av.cancelThreshold
            }
            return bb
        }
        function ae() {
            if (av.pinchThreshold !== null) {
                return aq >= av.pinchThreshold
            }
            return true
        }
        function aA() {
            var bb;
            if (av.maxTimeThreshold) {
                if (ab >= av.maxTimeThreshold) {
                    bb = false
                } else {
                    bb = true
                }
            } else {
                bb = true
            }
            return bb
        }
        function al(bb, bc) {
            if (av.preventDefaultEvents === false) {
                return
            }
            if (av.allowPageScroll === m) {
                bb.preventDefault()
            } else {
                var bd = av.allowPageScroll === s;
                switch (bc) {
                case p:
                    if ((av.swipeLeft && bd) || (!bd && av.allowPageScroll != D)) {
                        bb.preventDefault()
                    }
                    break;
                case o:
                    if ((av.swipeRight && bd) || (!bd && av.allowPageScroll != D)) {
                        bb.preventDefault()
                    }
                    break;
                case e:
                    if ((av.swipeUp && bd) || (!bd && av.allowPageScroll != u)) {
                        bb.preventDefault()
                    }
                    break;
                case x:
                    if ((av.swipeDown && bd) || (!bd && av.allowPageScroll != u)) {
                        bb.preventDefault()
                    }
                    break
                }
            }
        }
        function a8() {
            var bc = aO();
            var bb = X();
            var bd = ae();
            return bc && bb && bd
        }
        function aX() {
            return !!(av.pinchStatus || av.pinchIn || av.pinchOut)
        }
        function P() {
            return !!(a8() && aX())
        }
        function aV() {
            var be = aA();
            var bg = an();
            var bd = aO();
            var bb = X();
            var bc = ba();
            var bf=!bc && bb && bd && bg && be;
            return bf
        }
        function V() {
            return !!(av.swipe || av.swipeStatus || av.swipeLeft || av.swipeRight || av.swipeUp || av.swipeDown)
        }
        function I() {
            return !!(aV() && V())
        }
        function aO() {
            return ((W === av.fingers || av.fingers === i) ||!a)
        }
        function X() {
            return aQ[0].end.x !== 0
        }
        function a6() {
            return !!(av.tap)
        }
        function Y() {
            return !!(av.doubleTap)
        }
        function aU() {
            return !!(av.longTap)
        }
        function Q() {
            if (N == null) {
                return false
            }
            var bb = at();
            return (Y() && ((bb - N) <= av.doubleTapThreshold))
        }
        function H() {
            return Q()
        }
        function ax() {
            return ((W === 1 ||!a) && (isNaN(ag) || ag < av.threshold))
        }
        function a0() {
            return ((ab > av.longTapThreshold) && (ag < r))
        }
        function ah() {
            return !!(ax() && a6())
        }
        function aG() {
            return !!(Q() && Y())
        }
        function ap() {
            return !!(a0() && aU())
        }
        function F() {
            a5 = at();
            ad = event.touches.length + 1
        }
        function R() {
            a5 = 0;
            ad = 0
        }
        function am() {
            var bb = false;
            if (a5) {
                var bc = at() - a5;
                if (bc <= av.fingerReleaseThreshold) {
                    bb = true
                }
            }
            return bb
        }
        function aB() {
            return !!(aR.data(B + "_intouch") === true)
        }
        function ao(bb) {
            if (bb === true) {
                aR.bind(ay, a3);
                aR.bind(U, L);
                if (S) {
                    aR.bind(S, K)
                }
            } else {
                aR.unbind(ay, a3, false);
                aR.unbind(U, L, false);
                if (S) {
                    aR.unbind(S, K, false)
                }
            }
            aR.data(B + "_intouch", bb === true)
        }
        function ai(bc, bb) {
            var bd = bb.identifier !== undefined ? bb.identifier: 0;
            aQ[bc].identifier = bd;
            aQ[bc].start.x = aQ[bc].end.x = bb.pageX || bb.clientX;
            aQ[bc].start.y = aQ[bc].end.y = bb.pageY || bb.clientY;
            return aQ[bc]
        }
        function aH(bb) {
            var bd = bb.identifier !== undefined ? bb.identifier: 0;
            var bc = ac(bd);
            bc.end.x = bb.pageX || bb.clientX;
            bc.end.y = bb.pageY || bb.clientY;
            return bc
        }
        function ac(bc) {
            for (var bb = 0; bb < aQ.length; bb++) {
                if (aQ[bb].identifier == bc) {
                    return aQ[bb]
                }
            }
        }
        function aj() {
            var bb = [];
            for (var bc = 0; bc <= 5; bc++) {
                bb.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                })
            }
            return bb
        }
        function aI(bb, bc) {
            bc = Math.max(bc, aT(bb));
            M[bb].distance = bc
        }
        function aT(bb) {
            if (M[bb]) {
                return M[bb].distance
            }
            return undefined
        }
        function aa() {
            var bb = {};
            bb[p] = aw(p);
            bb[o] = aw(o);
            bb[e] = aw(e);
            bb[x] = aw(x);
            return bb
        }
        function aw(bb) {
            return {
                direction: bb,
                distance: 0
            }
        }
        function aM() {
            return a2 - T
        }
        function au(be, bd) {
            var bc = Math.abs(be.x - bd.x);
            var bb = Math.abs(be.y - bd.y);
            return Math.round(Math.sqrt(bc * bc + bb * bb))
        }
        function a7(bb, bc) {
            var bd = (bc / bb) * 1;
            return bd.toFixed(2)
        }
        function ar() {
            if (G < 1) {
                return z
            } else {
                return c
            }
        }
        function aS(bc, bb) {
            return Math.round(Math.sqrt(Math.pow(bb.x - bc.x, 2) + Math.pow(bb.y - bc.y, 2)))
        }
        function aE(be, bc) {
            var bb = be.x - bc.x;
            var bg = bc.y - be.y;
            var bd = Math.atan2(bg, bb);
            var bf = Math.round(bd * 180 / Math.PI);
            if (bf < 0) {
                bf = 360 - Math.abs(bf)
            }
            return bf
        }
        function aL(bc, bb) {
            var bd = aE(bc, bb);
            if ((bd <= 45) && (bd >= 0)) {
                return p
            } else {
                if ((bd <= 360) && (bd >= 315)) {
                    return p
                } else {
                    if ((bd >= 135) && (bd <= 225)) {
                        return o
                    } else {
                        if ((bd > 45) && (bd < 135)) {
                            return x
                        } else {
                            return e
                        }
                    }
                }
            }
        }
        function at() {
            var bb = new Date();
            return bb.getTime()
        }
        function aY(bb) {
            bb = f(bb);
            var bd = bb.offset();
            var bc = {
                left: bd.left,
                right: bd.left + bb.outerWidth(),
                top: bd.top,
                bottom: bd.top + bb.outerHeight()
            };
            return bc
        }
        function E(bb, bc) {
            return (bb.x > bc.left && bb.x < bc.right && bb.y > bc.top && bb.y < bc.bottom)
        }
    }
}));;
/*
 *  Vide - v0.3.2
 *  Easy as hell jQuery plugin for video backgrounds.
 *  http://vodkabears.github.io/vide/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */
!function(a, b, c, d) {
    "use strict";
    function e(a) {
        var b, c, d, e, f, g, h, i = {};
        for (f = a.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(","), h = 0, g = f.length; g > h && (c = f[h], - 1 === c.search(/^(http|https|ftp):\/\//)&&-1 !== c.search(":")); h++)
            b = c.indexOf(":"), d = c.substring(0, b), e = c.substring(b + 1), e || (e = void 0), "string" == typeof e && (e = "true" === e || ("false" === e?!1 : e)), "string" == typeof e && (e = isNaN(e) ? e : + e), i[d] = e;
        return null == d && null == e ? a : i
    }
    function f(a) {
        a = "" + a;
        var b, c, d, e = a.split(/\s+/), f = "50%", g = "50%";
        for (d = 0, b = e.length; b > d; d++)
            c = e[d], "left" === c ? f = "0%" : "right" === c ? f = "100%" : "top" === c ? g = "0%" : "bottom" === c ? g = "100%" : "center" === c ? 0 === d ? f = "50%" : g = "50%" : 0 === d ? f = c : g = c;
        return {
            x: f,
            y: g
        }
    }
    function g(b, c) {
        var d = function() {
            c(this.src)
        };
        a('<img src="' + b + '.gif">').load(d), a('<img src="' + b + '.jpg">').load(d), a('<img src="' + b + '.jpeg">').load(d), a('<img src="' + b + '.png">').load(d)
    }
    function h(b, c, d) {
        if (this.$element = a(b), "string" == typeof c && (c = e(c)), d ? "string" == typeof d && (d = e(d)) : d = {}, "string" == typeof c)
            c = c.replace(/\.\w*$/, "");
        else if ("object" == typeof c)
            for (var f in c)
                c.hasOwnProperty(f) && (c[f] = c[f].replace(/\.\w*$/, ""));
        this.settings = a.extend({}, j, d), this.path = c, this.init()
    }
    var i = "vide", j = {
        volume: 1,
        playbackRate: 1,
        muted: !0,
        loop: !0,
        autoplay: !0,
        position: "50% 50%",
        posterType: "detect",
        resizing: !0
    }, k = /iPad|iPhone|iPod/i.test(d.userAgent), l = /Android/i.test(d.userAgent);
    h.prototype.init = function() {
        var b, c, d = this, e = f(d.settings.position);
        d.$wrapper = a("<div>").css({
            position: "absolute",
            "z-index": - 1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "background-position": e.x + " " + e.y
        }), c = d.path, "object" == typeof d.path && (d.path.poster ? c = d.path.poster : d.path.mp4 ? c = d.path.mp4 : d.path.webm ? c = d.path.webm : d.path.ogv && (c = d.path.ogv)), "detect" === d.settings.posterType ? g(c, function(a) {
            d.$wrapper.css("background-image", "url(" + a + ")")
        }) : "none" !== d.settings.posterType && d.$wrapper.css("background-image", "url(" + c + "." + d.settings.posterType + ")"), "static" === d.$element.css("position") && d.$element.css("position", "relative"), d.$element.prepend(d.$wrapper), k || l || (b = "", "object" == typeof d.path ? (d.path.mp4 && (b += '<source src="' + d.path.mp4 + '.mp4" type="video/mp4">'), d.path.webm && (b += '<source src="' + d.path.webm + '.webm" type="video/webm">'), d.path.ogv && (b += '<source src="' + d.path.ogv + '.ogv" type="video/ogv">'), d.$video = a("<video>" + b + "</video>")) : d.$video = a('<video><source src="' + d.path + '.mp4" type="video/mp4"><source src="' + d.path + '.webm" type="video/webm"><source src="' + d.path + '.ogv" type="video/ogg"></video>'), d.$video.css("visibility", "hidden"), d.$video.prop({
            autoplay: d.settings.autoplay,
            loop: d.settings.loop,
            volume: d.settings.volume,
            muted: d.settings.muted,
            defaultMuted: d.settings.muted,
            playbackRate: d.settings.playbackRate,
            defaultPlaybackRate: d.settings.playbackRate
        }), d.$wrapper.append(d.$video), d.$video.css({
            margin: "auto",
            position: "absolute",
            "z-index": - 1,
            top: e.y,
            left: e.x,
            "-webkit-transform": "translate(-" + e.x + ", -" + e.y + ")",
            "-ms-transform": "translate(-" + e.x + ", -" + e.y + ")",
            "-moz-transform": "translate(-" + e.x + ", -" + e.y + ")",
            transform: "translate(-" + e.x + ", -" + e.y + ")"
        }), d.$video.on("canplaythrough." + i, function() {
            d.$video.css("visibility", "visible"), d.$video.prop("autoplay") && d.$video[0].play(), d.resize(), d.$wrapper.css("background-image", "none")
        }), d.$element.on("resize." + i, function() {
            d.settings.resizing && d.resize()
        }))
    }, h.prototype.getVideoObject = function() {
        return this.$video ? this.$video[0] : null
    }, h.prototype.resize = function() {
        if (this.$video) {
            var a = this.$video[0].videoHeight, b = this.$video[0].videoWidth, c = this.$wrapper.height(), d = this.$wrapper.width();
            this.$video.css(d / b > c / a ? {
                width: d + 2,
                height: "auto"
            } : {
                width: "auto",
                height: c + 2
            })
        }
    }, h.prototype.destroy = function() {
        this.$element.off(i), this.$video && this.$video.off(i), delete a[i].lookup[this.index], this.$element.removeData(i), this.$wrapper.remove()
    }, a[i] = {
        lookup: []
    }, a.fn[i] = function(b, c) {
        var d;
        return this.each(function() {
            d = a.data(this, i), d && d.destroy(), d = new h(this, b, c), d.index = a[i].lookup.push(d) - 1, a.data(this, i, d)
        }), this
    }, a(c).ready(function() {
        a(b).on("resize." + i, function() {
            for (var b, c = a[i].lookup.length, d = 0; c > d; d++)
                b = a[i].lookup[d], b && b.settings.resizing && b.resize()
        }), a(c).find("[data-" + i + "-bg]").each(function(b, c) {
            var d = a(c), e = d.data(i + "-options"), f = d.data(i + "-bg");
            d[i](f, e)
        })
    })
}(window.jQuery, window, document, navigator);;
/**!
 * MixItUp v2.1.7
 *
 * @copyright Copyright 2014 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://mixitup.kunkalabs.com
 *
 * @license   Commercial use requires a commercial license.
 *            https://mixitup.kunkalabs.com/licenses/
 *
 *            Non-commercial use permitted under terms of CC-BY-NC license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */
!function(a, b) {
    a.MixItUp = function() {
        var b = this;
        b._execAction("_constructor", 0), a.extend(b, {
            selectors: {
                target: ".mix",
                filter: ".filter",
                sort: ".sort"
            },
            animation: {
                enable: !0,
                effects: "fade scale",
                duration: 600,
                easing: "ease",
                perspectiveDistance: "3000",
                perspectiveOrigin: "50% 50%",
                queue: !0,
                queueLimit: 1,
                animateChangeLayout: !1,
                animateResizeContainer: !0,
                animateResizeTargets: !1,
                staggerSequence: !1,
                reverseOut: !1
            },
            callbacks: {
                onMixLoad: !1,
                onMixStart: !1,
                onMixBusy: !1,
                onMixEnd: !1,
                onMixFail: !1,
                _user: !1
            },
            controls: {
                enable: !0,
                live: !1,
                toggleFilterButtons: !1,
                toggleLogic: "or",
                activeClass: "active"
            },
            layout: {
                display: "inline-block",
                containerClass: "",
                containerClassFail: "fail"
            },
            load: {
                filter: "all",
                sort: !1
            },
            _$body: null,
            _$container: null,
            _$targets: null,
            _$parent: null,
            _$sortButtons: null,
            _$filterButtons: null,
            _suckMode: !1,
            _mixing: !1,
            _sorting: !1,
            _clicking: !1,
            _loading: !0,
            _changingLayout: !1,
            _changingClass: !1,
            _changingDisplay: !1,
            _origOrder: [],
            _startOrder: [],
            _newOrder: [],
            _activeFilter: null,
            _toggleArray: [],
            _toggleString: "",
            _activeSort: "default:asc",
            _newSort: null,
            _startHeight: null,
            _newHeight: null,
            _incPadding: !0,
            _newDisplay: null,
            _newClass: null,
            _targetsBound: 0,
            _targetsDone: 0,
            _queue: [],
            _$show: a(),
            _$hide: a()
        }), b._execAction("_constructor", 1)
    }, a.MixItUp.prototype = {
        constructor: a.MixItUp,
        _instances: {},
        _handled: {
            _filter: {},
            _sort: {}
        },
        _bound: {
            _filter: {},
            _sort: {}
        },
        _actions: {},
        _filters: {},
        extend: function(b) {
            for (var c in b)
                a.MixItUp.prototype[c] = b[c]
        },
        addAction: function(b, c, d, e) {
            a.MixItUp.prototype._addHook("_actions", b, c, d, e)
        },
        addFilter: function(b, c, d, e) {
            a.MixItUp.prototype._addHook("_filters", b, c, d, e)
        },
        _addHook: function(b, c, d, e, f) {
            var g = a.MixItUp.prototype[b], h = {};
            f = 1 === f || "post" === f ? "post" : "pre", h[c] = {}, h[c][f] = {}, h[c][f][d] = e, a.extend(!0, g, h)
        },
        _init: function(b, c) {
            var d = this;
            if (d._execAction("_init", 0, arguments), c && a.extend(!0, d, c), d._$body = a("body"), d._domNode = b, d._$container = a(b), d._$container.addClass(d.layout.containerClass), d._id = b.id, d._platformDetect(), d._brake = d._getPrefixedCSS("transition", "none"), d._refresh(!0), d._$parent = d._$targets.parent().length ? d._$targets.parent() : d._$container, d.load.sort && (d._newSort = d._parseSort(d.load.sort), d._newSortString = d.load.sort, d._activeSort = d.load.sort, d._sort(), d._printSort()), d._activeFilter = "all" === d.load.filter ? d.selectors.target : "none" === d.load.filter ? "" : d.load.filter, d.controls.enable && d._bindHandlers(), d.controls.toggleFilterButtons) {
                d._buildToggleArray();
                for (var e = 0; e < d._toggleArray.length; e++)
                    d._updateControls({
                        filter: d._toggleArray[e],
                        sort: d._activeSort
                    }, !0)
            } else
                d.controls.enable && d._updateControls({
                    filter: d._activeFilter,
                    sort: d._activeSort
                });
            d._filter(), d._init=!0, d._$container.data("mixItUp", d), d._execAction("_init", 1, arguments), d._buildState(), d._$targets.css(d._brake), d._goMix(d.animation.enable)
        },
        _platformDetect: function() {
            var a = this, c = ["Webkit", "Moz", "O", "ms"], d = ["webkit", "moz"], e = window.navigator.appVersion.match(/Chrome\/(\d+)\./) ||!1, f = "undefined" != typeof InstallTrigger, g = function(a) {
                for (var b = 0; b < c.length; b++)
                    if (c[b] + "Transition"in a.style)
                        return {
                            prefix: "-" + c[b].toLowerCase() + "-",
                            vendor: c[b]
                        };
                return "transition"in a.style ? "" : !1
            }, h = g(a._domNode);
            a._execAction("_platformDetect", 0), a._chrome = e ? parseInt(e[1], 10) : !1, a._ff = f ? parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]) : !1, a._prefix = h.prefix, a._vendor = h.vendor, a._suckMode = window.atob && a._prefix?!1 : !0, a._suckMode && (a.animation.enable=!1), a._ff && a._ff <= 4 && (a.animation.enable=!1);
            for (var i = 0; i < d.length&&!window.requestAnimationFrame; i++)
                window.requestAnimationFrame = window[d[i] + "RequestAnimationFrame"];
            "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" == typeof"test".__proto__ ? function(a) {
                return a.__proto__
            } : function(a) {
                return a.constructor.prototype
            }), a._domNode.nextElementSibling === b && Object.defineProperty(Element.prototype, "nextElementSibling", {
                get: function() {
                    for (var a = this.nextSibling; a;) {
                        if (1 === a.nodeType)
                            return a;
                        a = a.nextSibling
                    }
                    return null
                }
            }), a._execAction("_platformDetect", 1)
        },
        _refresh: function(a, c) {
            var d = this;
            d._execAction("_refresh", 0, arguments), d._$targets = d._$container.find(d.selectors.target);
            for (var e = 0; e < d._$targets.length; e++) {
                var f = d._$targets[e];
                if (f.dataset === b || c) {
                    f.dataset = {};
                    for (var g = 0; g < f.attributes.length; g++) {
                        var h = f.attributes[g], i = h.name, j = h.value;
                        if (i.indexOf("data-")>-1) {
                            var k = d._helpers._camelCase(i.substring(5, i.length));
                            f.dataset[k] = j
                        }
                    }
                }
                f.mixParent === b && (f.mixParent = d._id)
            }
            if (d._$targets.length && a ||!d._origOrder.length && d._$targets.length) {
                d._origOrder = [];
                for (var e = 0; e < d._$targets.length; e++) {
                    var f = d._$targets[e];
                    d._origOrder.push(f)
                }
            }
            d._execAction("_refresh", 1, arguments)
        },
        _bindHandlers: function() {
            var c = this, d = a.MixItUp.prototype._bound._filter, e = a.MixItUp.prototype._bound._sort;
            c._execAction("_bindHandlers", 0), c.controls.live ? c._$body.on("click.mixItUp." + c._id, c.selectors.sort, function() {
                c._processClick(a(this), "sort")
            }).on("click.mixItUp." + c._id, c.selectors.filter, function() {
                c._processClick(a(this), "filter")
            }) : (c._$sortButtons = a(c.selectors.sort), c._$filterButtons = a(c.selectors.filter), c._$sortButtons.on("click.mixItUp." + c._id, function() {
                c._processClick(a(this), "sort")
            }), c._$filterButtons.on("click.mixItUp." + c._id, function() {
                c._processClick(a(this), "filter")
            })), d[c.selectors.filter] = d[c.selectors.filter] === b ? 1 : d[c.selectors.filter] + 1, e[c.selectors.sort] = e[c.selectors.sort] === b ? 1 : e[c.selectors.sort] + 1, c._execAction("_bindHandlers", 1)
        },
        _processClick: function(c, d) {
            var e = this, f = function(c, d, f) {
                var g = a.MixItUp.prototype;
                g._handled["_" + d][e.selectors[d]] = g._handled["_" + d][e.selectors[d]] === b ? 1 : g._handled["_" + d][e.selectors[d]] + 1, g._handled["_" + d][e.selectors[d]] === g._bound["_" + d][e.selectors[d]] && (c[(f ? "remove" : "add") + "Class"](e.controls.activeClass), delete g._handled["_" + d][e.selectors[d]])
            };
            if (e._execAction("_processClick", 0, arguments), !e._mixing || e.animation.queue && e._queue.length < e.animation.queueLimit) {
                if (e._clicking=!0, "sort" === d) {
                    var g = c.attr("data-sort");
                    (!c.hasClass(e.controls.activeClass) || g.indexOf("random")>-1) && (a(e.selectors.sort).removeClass(e.controls.activeClass), f(c, d), e.sort(g))
                }
                if ("filter" === d) {
                    var h, i = c.attr("data-filter"), j = "or" === e.controls.toggleLogic ? ",": "";
                    e.controls.toggleFilterButtons ? (e._buildToggleArray(), c.hasClass(e.controls.activeClass) ? (f(c, d, !0), h = e._toggleArray.indexOf(i), e._toggleArray.splice(h, 1)) : (f(c, d), e._toggleArray.push(i)), e._toggleArray = a.grep(e._toggleArray, function(a) {
                        return a
                    }), e._toggleString = e._toggleArray.join(j), e.filter(e._toggleString)) : c.hasClass(e.controls.activeClass) || (a(e.selectors.filter).removeClass(e.controls.activeClass), f(c, d), e.filter(i))
                }
                e._execAction("_processClick", 1, arguments)
            } else
                "function" == typeof e.callbacks.onMixBusy && e.callbacks.onMixBusy.call(e._domNode, e._state, e), e._execAction("_processClickBusy", 1, arguments)
        },
        _buildToggleArray: function() {
            var a = this, b = a._activeFilter.replace(/\s/g, "");
            if (a._execAction("_buildToggleArray", 0, arguments), "or" === a.controls.toggleLogic)
                a._toggleArray = b.split(",");
            else {
                a._toggleArray = b.split("."), !a._toggleArray[0] && a._toggleArray.shift();
                for (var c, d = 0; c = a._toggleArray[d]; d++)
                    a._toggleArray[d] = "." + c
            }
            a._execAction("_buildToggleArray", 1, arguments)
        },
        _updateControls: function(c, d) {
            var e = this, f = {
                filter: c.filter,
                sort: c.sort
            }, g = function(a, b) {
                d && "filter" === h && "none" !== f.filter && "" !== f.filter ? a.filter(b).addClass(e.controls.activeClass) : a.removeClass(e.controls.activeClass).filter(b).addClass(e.controls.activeClass)
            }, h = "filter", i = null;
            e._execAction("_updateControls", 0, arguments), c.filter === b && (f.filter = e._activeFilter), c.sort === b && (f.sort = e._activeSort), f.filter === e.selectors.target && (f.filter = "all");
            for (var j = 0; 2 > j; j++)
                i = e.controls.live ? a(e.selectors[h]) : e["_$" + h + "Buttons"], i && g(i, "[data-" + h + '="' + f[h] + '"]'), h = "sort";
            e._execAction("_updateControls", 1, arguments)
        },
        _filter: function() {
            var b = this;
            b._execAction("_filter", 0);
            for (var c = 0; c < b._$targets.length; c++) {
                var d = a(b._$targets[c]);
                d.is(b._activeFilter) ? b._$show = b._$show.add(d) : b._$hide = b._$hide.add(d)
            }
            b._execAction("_filter", 1)
        },
        _sort: function() {
            var a = this, b = function(a) {
                for (var b = a.slice(), c = b.length, d = c; d--;) {
                    var e = parseInt(Math.random() * c), f = b[d];
                    b[d] = b[e], b[e] = f
                }
                return b
            };
            a._execAction("_sort", 0), a._startOrder = [];
            for (var c = 0; c < a._$targets.length; c++) {
                var d = a._$targets[c];
                a._startOrder.push(d)
            }
            switch (a._newSort[0].sortBy) {
            case"default":
                a._newOrder = a._origOrder;
                break;
            case"random":
                a._newOrder = b(a._startOrder);
                break;
            case"custom":
                a._newOrder = a._newSort[0].order;
                break;
            default:
                a._newOrder = a._startOrder.concat().sort(function(b, c) {
                    return a._compare(b, c)
                })
            }
            a._execAction("_sort", 1)
        },
        _compare: function(a, b, c) {
            c = c ? c : 0;
            var d = this, e = d._newSort[c].order, f = function(a) {
                return a.dataset[d._newSort[c].sortBy] || 0
            }, g = isNaN(1 * f(a)) ? f(a).toLowerCase(): 1 * f(a), h = isNaN(1 * f(b)) ? f(b).toLowerCase(): 1 * f(b);
            return h > g ? "asc" === e?-1 : 1 : g > h ? "asc" === e ? 1 : - 1 : g === h && d._newSort.length > c + 1 ? d._compare(a, b, c + 1) : 0
        },
        _printSort: function(a) {
            var b = this, c = a ? b._startOrder: b._newOrder, d = b._$parent[0].querySelectorAll(b.selectors.target), e = d.length ? d[d.length - 1].nextElementSibling: null, f = document.createDocumentFragment();
            b._execAction("_printSort", 0, arguments);
            for (var g = 0; g < d.length; g++) {
                var h = d[g], i = h.nextSibling;
                "absolute" !== h.style.position && (i && "#text" === i.nodeName && b._$parent[0].removeChild(i), b._$parent[0].removeChild(h))
            }
            for (var g = 0; g < c.length; g++) {
                var j = c[g];
                if ("default" !== b._newSort[0].sortBy || "desc" !== b._newSort[0].order || a)
                    f.appendChild(j), f.appendChild(document.createTextNode(" "));
                else {
                    var k = f.firstChild;
                    f.insertBefore(j, k), f.insertBefore(document.createTextNode(" "), j)
                }
            }
            e ? b._$parent[0].insertBefore(f, e) : b._$parent[0].appendChild(f), b._execAction("_printSort", 1, arguments)
        },
        _parseSort: function(a) {
            for (var b = this, c = "string" == typeof a ? a.split(" ") : [a], d = [], e = 0; e < c.length; e++) {
                var f = "string" == typeof a ? c[e].split(":"): ["custom", c[e]], g = {
                    sortBy: b._helpers._camelCase(f[0]),
                    order: f[1] || "asc"
                };
                if (d.push(g), "default" === g.sortBy || "random" === g.sortBy)
                    break
            }
            return b._execFilter("_parseSort", d, arguments)
        },
        _parseEffects: function() {
            var a = this, b = {
                opacity: "",
                transformIn: "",
                transformOut: "",
                filter: ""
            }, c = function(b, c) {
                if (a.animation.effects.indexOf(b)>-1) {
                    if (c) {
                        var d = a.animation.effects.indexOf(b + "(");
                        if (d>-1) {
                            var e = a.animation.effects.substring(d), f = /\(([^)]+)\)/.exec(e), g = f[1];
                            return {
                                val: g
                            }
                        }
                    }
                    return !0
                }
                return !1
            }, d = function(a, b) {
                return b ? "-" === a.charAt(0) ? a.substr(1, a.length) : "-" + a : a
            }, e = function(a, e) {
                for (var f = [["scale", ".01"], ["translateX", "20px"], ["translateY", "20px"], ["translateZ", "20px"], ["rotateX", "90deg"], ["rotateY", "90deg"], ["rotateZ", "180deg"]], g = 0; g < f.length; g++) {
                    var h = f[g][0], i = f[g][1], j = e && "scale" !== h;
                    b[a] += c(h) ? h + "(" + d(c(h, !0).val || i, j) + ") " : ""
                }
            };
            return b.opacity = c("fade") ? c("fade", !0).val || "0" : "1", e("transformIn"), a.animation.reverseOut ? e("transformOut", !0) : b.transformOut = b.transformIn, b.transition = {}, b.transition = a._getPrefixedCSS("transition", "all " + a.animation.duration + "ms " + a.animation.easing + ", opacity " + a.animation.duration + "ms linear"), a.animation.stagger = c("stagger")?!0 : !1, a.animation.staggerDuration = parseInt(c("stagger") ? c("stagger", !0).val ? c("stagger", !0).val : 100 : 100), a._execFilter("_parseEffects", b)
        },
        _buildState: function(a) {
            var b = this, c = {};
            return b._execAction("_buildState", 0), c = {
                activeFilter: "" === b._activeFilter ? "none": b._activeFilter,
                activeSort: a && b._newSortString ? b._newSortString: b._activeSort,
                fail: !b._$show.length && "" !== b._activeFilter,
                $targets: b._$targets,
                $show: b._$show,
                $hide: b._$hide,
                totalTargets: b._$targets.length,
                totalShow: b._$show.length,
                totalHide: b._$hide.length,
                display: a && b._newDisplay ? b._newDisplay: b.layout.display
            }, a ? b._execFilter("_buildState", c) : (b._state = c, b._execAction("_buildState", 1), void 0)
        },
        _goMix: function(a) {
            var b = this, c = function() {
                b._chrome && 31 === b._chrome && f(b._$parent[0]), b._setInter(), d()
            }, d = function() {
                var a = window.pageYOffset, c = window.pageXOffset;
                document.documentElement.scrollHeight, b._getInterMixData(), b._setFinal(), b._getFinalMixData(), window.pageYOffset !== a && window.scrollTo(c, a), b._prepTargets(), window.requestAnimationFrame ? requestAnimationFrame(e) : setTimeout(function() {
                    e()
                }, 20)
            }, e = function() {
                b._animateTargets(), 0 === b._targetsBound && b._cleanUp()
            }, f = function(a) {
                var b = a.parentElement, c = document.createElement("div"), d = document.createDocumentFragment();
                b.insertBefore(c, a), d.appendChild(a), b.replaceChild(a, c)
            }, g = b._buildState(!0);
            b._execAction("_goMix", 0, arguments), !b.animation.duration && (a=!1), b._mixing=!0, b._$container.removeClass(b.layout.containerClassFail), "function" == typeof b.callbacks.onMixStart && b.callbacks.onMixStart.call(b._domNode, b._state, g, b), b._$container.trigger("mixStart", [b._state, g, b]), b._getOrigMixData(), a&&!b._suckMode ? window.requestAnimationFrame ? requestAnimationFrame(c) : c() : b._cleanUp(), b._execAction("_goMix", 1, arguments)
        },
        _getTargetData: function(a, b) {
            var c, d = this;
            a.dataset[b + "PosX"] = a.offsetLeft, a.dataset[b + "PosY"] = a.offsetTop, d.animation.animateResizeTargets && (c = window.getComputedStyle(a), a.dataset[b + "MarginBottom"] = parseInt(c.marginBottom), a.dataset[b + "MarginRight"] = parseInt(c.marginRight), a.dataset[b + "Width"] = a.offsetWidth, a.dataset[b + "Height"] = a.offsetHeight)
        },
        _getOrigMixData: function() {
            var a = this, b = a._suckMode ? {
                boxSizing: ""
            }
            : window.getComputedStyle(a._$parent[0]), c = b.boxSizing || b[a._vendor + "BoxSizing"];
            a._incPadding = "border-box" === c, a._execAction("_getOrigMixData", 0), !a._suckMode && (a.effects = a._parseEffects()), a._$toHide = a._$hide.filter(":visible"), a._$toShow = a._$show.filter(":hidden"), a._$pre = a._$targets.filter(":visible"), a._startHeight = a._incPadding ? a._$parent.outerHeight() : a._$parent.height();
            for (var d = 0; d < a._$pre.length; d++) {
                var e = a._$pre[d];
                a._getTargetData(e, "orig")
            }
            a._execAction("_getOrigMixData", 1)
        },
        _setInter: function() {
            var a = this;
            a._execAction("_setInter", 0), a._changingLayout && a.animation.animateChangeLayout ? (a._$toShow.css("display", a._newDisplay), a._changingClass && a._$container.removeClass(a.layout.containerClass).addClass(a._newClass)) : a._$toShow.css("display", a.layout.display), a._execAction("_setInter", 1)
        },
        _getInterMixData: function() {
            var a = this;
            a._execAction("_getInterMixData", 0);
            for (var b = 0; b < a._$toShow.length; b++) {
                var c = a._$toShow[b];
                a._getTargetData(c, "inter")
            }
            for (var b = 0; b < a._$pre.length; b++) {
                var c = a._$pre[b];
                a._getTargetData(c, "inter")
            }
            a._execAction("_getInterMixData", 1)
        },
        _setFinal: function() {
            var a = this;
            a._execAction("_setFinal", 0), a._sorting && a._printSort(), a._$toHide.removeStyle("display"), a._changingLayout && a.animation.animateChangeLayout && a._$pre.css("display", a._newDisplay), a._execAction("_setFinal", 1)
        },
        _getFinalMixData: function() {
            var a = this;
            a._execAction("_getFinalMixData", 0);
            for (var b = 0; b < a._$toShow.length; b++) {
                var c = a._$toShow[b];
                a._getTargetData(c, "final")
            }
            for (var b = 0; b < a._$pre.length; b++) {
                var c = a._$pre[b];
                a._getTargetData(c, "final")
            }
            a._newHeight = a._incPadding ? a._$parent.outerHeight() : a._$parent.height(), a._sorting && a._printSort(!0), a._$toShow.removeStyle("display"), a._$pre.css("display", a.layout.display), a._changingClass && a.animation.animateChangeLayout && a._$container.removeClass(a._newClass).addClass(a.layout.containerClass), a._execAction("_getFinalMixData", 1)
        },
        _prepTargets: function() {
            var b = this, c = {
                _in: b._getPrefixedCSS("transform", b.effects.transformIn),
                _out: b._getPrefixedCSS("transform", b.effects.transformOut)
            };
            b._execAction("_prepTargets", 0), b.animation.animateResizeContainer && b._$parent.css("height", b._startHeight + "px");
            for (var d = 0; d < b._$toShow.length; d++) {
                var e = b._$toShow[d], f = a(e);
                e.style.opacity = b.effects.opacity, e.style.display = b._changingLayout && b.animation.animateChangeLayout ? b._newDisplay : b.layout.display, f.css(c._in), b.animation.animateResizeTargets && (e.style.width = e.dataset.finalWidth + "px", e.style.height = e.dataset.finalHeight + "px", e.style.marginRight =- (e.dataset.finalWidth - e.dataset.interWidth) + 1 * e.dataset.finalMarginRight + "px", e.style.marginBottom =- (e.dataset.finalHeight - e.dataset.interHeight) + 1 * e.dataset.finalMarginBottom + "px")
            }
            for (var d = 0; d < b._$pre.length; d++) {
                var e = b._$pre[d], f = a(e), g = {
                    x: e.dataset.origPosX - e.dataset.interPosX,
                    y: e.dataset.origPosY - e.dataset.interPosY
                }, c = b._getPrefixedCSS("transform", "translate(" + g.x + "px," + g.y + "px)");
                f.css(c), b.animation.animateResizeTargets && (e.style.width = e.dataset.origWidth + "px", e.style.height = e.dataset.origHeight + "px", e.dataset.origWidth - e.dataset.finalWidth && (e.style.marginRight =- (e.dataset.origWidth - e.dataset.interWidth) + 1 * e.dataset.origMarginRight + "px"), e.dataset.origHeight - e.dataset.finalHeight && (e.style.marginBottom =- (e.dataset.origHeight - e.dataset.interHeight) + 1 * e.dataset.origMarginBottom + "px"))
            }
            b._execAction("_prepTargets", 1)
        },
        _animateTargets: function() {
            var b = this;
            b._execAction("_animateTargets", 0), b._targetsDone = 0, b._targetsBound = 0, b._$parent.css(b._getPrefixedCSS("perspective", b.animation.perspectiveDistance + "px")).css(b._getPrefixedCSS("perspective-origin", b.animation.perspectiveOrigin)), b.animation.animateResizeContainer && b._$parent.css(b._getPrefixedCSS("transition", "height " + b.animation.duration + "ms ease")).css("height", b._newHeight + "px");
            for (var c = 0; c < b._$toShow.length; c++) {
                var d = b._$toShow[c], e = a(d), f = {
                    x: d.dataset.finalPosX - d.dataset.interPosX,
                    y: d.dataset.finalPosY - d.dataset.interPosY
                }, g = b._getDelay(c), h = {};
                d.style.opacity = "";
                for (var i = 0; 2 > i; i++) {
                    var j = 0 === i ? j = b._prefix: "";
                    b._ff && b._ff <= 20 && (h[j + "transition-property"] = "all", h[j + "transition-timing-function"] = b.animation.easing + "ms", h[j + "transition-duration"] = b.animation.duration + "ms"), h[j + "transition-delay"] = g + "ms", h[j + "transform"] = "translate(" + f.x + "px," + f.y + "px)"
                }(b.effects.transform || b.effects.opacity) && b._bindTargetDone(e), b._ff && b._ff <= 20 ? e.css(h) : e.css(b.effects.transition).css(h)
            }
            for (var c = 0; c < b._$pre.length; c++) {
                var d = b._$pre[c], e = a(d), f = {
                    x: d.dataset.finalPosX - d.dataset.interPosX,
                    y: d.dataset.finalPosY - d.dataset.interPosY
                }, g = b._getDelay(c);
                (d.dataset.finalPosX !== d.dataset.origPosX || d.dataset.finalPosY !== d.dataset.origPosY) && b._bindTargetDone(e), e.css(b._getPrefixedCSS("transition", "all " + b.animation.duration + "ms " + b.animation.easing + " " + g + "ms")), e.css(b._getPrefixedCSS("transform", "translate(" + f.x + "px," + f.y + "px)")), b.animation.animateResizeTargets && (d.dataset.origWidth - d.dataset.finalWidth && 1 * d.dataset.finalWidth && (d.style.width = d.dataset.finalWidth + "px", d.style.marginRight =- (d.dataset.finalWidth - d.dataset.interWidth) + 1 * d.dataset.finalMarginRight + "px"), d.dataset.origHeight - d.dataset.finalHeight && 1 * d.dataset.finalHeight && (d.style.height = d.dataset.finalHeight + "px", d.style.marginBottom =- (d.dataset.finalHeight - d.dataset.interHeight) + 1 * d.dataset.finalMarginBottom + "px"))
            }
            b._changingClass && b._$container.removeClass(b.layout.containerClass).addClass(b._newClass);
            for (var c = 0; c < b._$toHide.length; c++) {
                for (var d = b._$toHide[c], e = a(d), g = b._getDelay(c), k = {}, i = 0; 2 > i; i++) {
                    var j = 0 === i ? j = b._prefix: "";
                    k[j + "transition-delay"] = g + "ms", k[j + "transform"] = b.effects.transformOut, k.opacity = b.effects.opacity
                }
                e.css(b.effects.transition).css(k), (b.effects.transform || b.effects.opacity) && b._bindTargetDone(e)
            }
            b._execAction("_animateTargets", 1)
        },
        _bindTargetDone: function(b) {
            var c = this, d = b[0];
            c._execAction("_bindTargetDone", 0, arguments), d.dataset.bound || (d.dataset.bound=!0, c._targetsBound++, b.on("webkitTransitionEnd.mixItUp transitionend.mixItUp", function(e) {
                (e.originalEvent.propertyName.indexOf("transform")>-1 || e.originalEvent.propertyName.indexOf("opacity")>-1) && a(e.originalEvent.target).is(c.selectors.target) && (b.off(".mixItUp"), delete d.dataset.bound, c._targetDone())
            })), c._execAction("_bindTargetDone", 1, arguments)
        },
        _targetDone: function() {
            var a = this;
            a._execAction("_targetDone", 0), a._targetsDone++, a._targetsDone === a._targetsBound && a._cleanUp(), a._execAction("_targetDone", 1)
        },
        _cleanUp: function() {
            var b = this, c = b.animation.animateResizeTargets ? "transform opacity width height margin-bottom margin-right": "transform opacity";
            unBrake = function() {
                b._$targets.removeStyle("transition", b._prefix)
            }, b._execAction("_cleanUp", 0), b._changingLayout ? b._$show.css("display", b._newDisplay) : b._$show.css("display", b.layout.display), b._$targets.css(b._brake), b._$targets.removeStyle(c, b._prefix).removeAttr("data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"), b._$hide.removeStyle("display"), b._$parent.removeStyle("height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin", b._prefix), b._sorting && (b._printSort(), b._activeSort = b._newSortString, b._sorting=!1), b._changingLayout && (b._changingDisplay && (b.layout.display = b._newDisplay, b._changingDisplay=!1), b._changingClass && (b._$parent.removeClass(b.layout.containerClass).addClass(b._newClass), b.layout.containerClass = b._newClass, b._changingClass=!1), b._changingLayout=!1), b._refresh(), b._buildState(), b._state.fail && b._$container.addClass(b.layout.containerClassFail), b._$show = a(), b._$hide = a(), window.requestAnimationFrame && requestAnimationFrame(unBrake), b._mixing=!1, "function" == typeof b.callbacks._user && b.callbacks._user.call(b._domNode, b._state, b), "function" == typeof b.callbacks.onMixEnd && b.callbacks.onMixEnd.call(b._domNode, b._state, b), b._$container.trigger("mixEnd", [b._state, b]), b._state.fail && ("function" == typeof b.callbacks.onMixFail && b.callbacks.onMixFail.call(b._domNode, b._state, b), b._$container.trigger("mixFail", [b._state, b])), b._loading && ("function" == typeof b.callbacks.onMixLoad && b.callbacks.onMixLoad.call(b._domNode, b._state, b), b._$container.trigger("mixLoad", [b._state, b])), b._queue.length && (b._execAction("_queue", 0), b.multiMix(b._queue[0][0], b._queue[0][1], b._queue[0][2]), b._queue.splice(0, 1)), b._execAction("_cleanUp", 1), b._loading=!1
        },
        _getPrefixedCSS: function(a, b, c) {
            var d = this, e = {};
            for (i = 0; 2 > i; i++) {
                var f = 0 === i ? d._prefix: "";
                e[f + a] = c ? f + b : b
            }
            return d._execFilter("_getPrefixedCSS", e, arguments)
        },
        _getDelay: function(a) {
            var b = this, c = "function" == typeof b.animation.staggerSequence ? b.animation.staggerSequence.call(b._domNode, a, b._state): a, d = b.animation.stagger ? c * b.animation.staggerDuration: 0;
            return b._execFilter("_getDelay", d, arguments)
        },
        _parseMultiMixArgs: function(a) {
            for (var b = this, c = {
                command: null,
                animate: b.animation.enable,
                callback: null
            }, d = 0; d < a.length; d++) {
                var e = a[d];
                null !== e && ("object" == typeof e || "string" == typeof e ? c.command = e : "boolean" == typeof e ? c.animate = e : "function" == typeof e && (c.callback = e))
            }
            return b._execFilter("_parseMultiMixArgs", c, arguments)
        },
        _parseInsertArgs: function(b) {
            for (var c = this, d = {
                index: 0,
                $object: a(),
                multiMix: {
                    filter: c._state.activeFilter
                },
                callback: null
            }, e = 0; e < b.length; e++) {
                var f = b[e];
                "number" == typeof f ? d.index = f : "object" == typeof f && f instanceof a ? d.$object = f : "object" == typeof f && c._helpers._isElement(f) ? d.$object = a(f) : "object" == typeof f && null !== f ? d.multiMix = f : "boolean" != typeof f || f ? "function" == typeof f && (d.callback = f) : d.multiMix=!1
            }
            return c._execFilter("_parseInsertArgs", d, arguments)
        },
        _execAction: function(a, b, c) {
            var d = this, e = b ? "post": "pre";
            if (!d._actions.isEmptyObject && d._actions.hasOwnProperty(a))
                for (var f in d._actions[a][e])
                    d._actions[a][e][f].call(d, c)
        },
        _execFilter: function(a, b, c) {
            var d = this;
            if (d._filters.isEmptyObject ||!d._filters.hasOwnProperty(a))
                return b;
            for (var e in d._filters[a])
                return d._filters[a][e].call(d, c)
        },
        _helpers: {
            _camelCase: function(a) {
                return a.replace(/-([a-z])/g, function(a) {
                    return a[1].toUpperCase()
                })
            },
            _isElement: function(a) {
                return window.HTMLElement ? a instanceof HTMLElement : null !== a && 1 === a.nodeType && "string" === a.nodeName
            }
        },
        isMixing: function() {
            var a = this;
            return a._execFilter("isMixing", a._mixing)
        },
        filter: function() {
            var a = this, b = a._parseMultiMixArgs(arguments);
            a._clicking && (a._toggleString = ""), a.multiMix({
                filter: b.command
            }, b.animate, b.callback)
        },
        sort: function() {
            var a = this, b = a._parseMultiMixArgs(arguments);
            a.multiMix({
                sort: b.command
            }, b.animate, b.callback)
        },
        changeLayout: function() {
            var a = this, b = a._parseMultiMixArgs(arguments);
            a.multiMix({
                changeLayout: b.command
            }, b.animate, b.callback)
        },
        multiMix: function() {
            var a = this, c = a._parseMultiMixArgs(arguments);
            if (a._execAction("multiMix", 0, arguments), a._mixing)
                a.animation.queue && a._queue.length < a.animation.queueLimit ? (a._queue.push(arguments), a.controls.enable&&!a._clicking && a._updateControls(c.command), a._execAction("multiMixQueue", 1, arguments)) : ("function" == typeof a.callbacks.onMixBusy && a.callbacks.onMixBusy.call(a._domNode, a._state, a), a._$container.trigger("mixBusy", [a._state, a]), a._execAction("multiMixBusy", 1, arguments));
            else {
                a.controls.enable&&!a._clicking && (a.controls.toggleFilterButtons && a._buildToggleArray(), a._updateControls(c.command, a.controls.toggleFilterButtons)), a._queue.length < 2 && (a._clicking=!1), delete a.callbacks._user, c.callback && (a.callbacks._user = c.callback);
                var d = c.command.sort, e = c.command.filter, f = c.command.changeLayout;
                a._refresh(), d && (a._newSort = a._parseSort(d), a._newSortString = d, a._sorting=!0, a._sort()), e !== b && (e = "all" === e ? a.selectors.target : e, a._activeFilter = e), a._filter(), f && (a._newDisplay = "string" == typeof f ? f : f.display || a.layout.display, a._newClass = f.containerClass || "", (a._newDisplay !== a.layout.display || a._newClass !== a.layout.containerClass) && (a._changingLayout=!0, a._changingClass = a._newClass !== a.layout.containerClass, a._changingDisplay = a._newDisplay !== a.layout.display)), a._$targets.css(a._brake), a._goMix(c.animate^a.animation.enable ? c.animate : a.animation.enable), a._execAction("multiMix", 1, arguments)
            }
        },
        insert: function() {
            var a = this, b = a._parseInsertArgs(arguments), c = "function" == typeof b.callback ? b.callback: null, d = document.createDocumentFragment(), e = function() {
                return a._refresh(), a._$targets.length ? b.index < a._$targets.length ||!a._$targets.length ? a._$targets[b.index] : a._$targets[a._$targets.length - 1].nextElementSibling : a._$parent[0].children[0]
            }();
            if (a._execAction("insert", 0, arguments), b.$object) {
                for (var f = 0; f < b.$object.length; f++) {
                    var g = b.$object[f];
                    d.appendChild(g), d.appendChild(document.createTextNode(" "))
                }
                a._$parent[0].insertBefore(d, e)
            }
            a._execAction("insert", 1, arguments), "object" == typeof b.multiMix && a.multiMix(b.multiMix, c)
        },
        prepend: function() {
            var a = this, b = a._parseInsertArgs(arguments);
            a.insert(0, b.$object, b.multiMix, b.callback)
        },
        append: function() {
            var a = this, b = a._parseInsertArgs(arguments);
            a.insert(a._state.totalTargets, b.$object, b.multiMix, b.callback)
        },
        getOption: function(a) {
            var c = this, d = function(a, c) {
                for (var d = c.split("."), e = d.pop(), f = d.length, g = 1, h = d[0] || c; (a = a[h]) && f > g;)
                    h = d[g], g++;
                return a !== b ? a[e] !== b ? a[e] : a : void 0
            };
            return a ? c._execFilter("getOption", d(c, a), arguments) : c
        },
        setOptions: function(b) {
            var c = this;
            c._execAction("setOptions", 0, arguments), "object" == typeof b && a.extend(!0, c, b), c._execAction("setOptions", 1, arguments)
        },
        getState: function() {
            var a = this;
            return a._execFilter("getState", a._state, a)
        },
        forceRefresh: function() {
            var a = this;
            a._refresh(!1, !0)
        },
        destroy: function(b) {
            var c = this;
            c._execAction("destroy", 0, arguments), c._$body.add(a(c.selectors.sort)).add(a(c.selectors.filter)).off(".mixItUp");
            for (var d = 0; d < c._$targets.length; d++) {
                var e = c._$targets[d];
                b && (e.style.display = ""), delete e.mixParent
            }
            c._execAction("destroy", 1, arguments), delete a.MixItUp.prototype._instances[c._id]
        }
    }, a.fn.mixItUp = function() {
        var c, d = arguments, e = [], f = function(b, c) {
            var d = new a.MixItUp, e = function() {
                return ("00000" + (16777216 * Math.random()<<0).toString(16)).substr( - 6).toUpperCase()
            };
            d._execAction("_instantiate", 0, arguments), b.id = b.id ? b.id : "MixItUp" + e(), d._instances[b.id] || (d._instances[b.id] = d, d._init(b, c)), d._execAction("_instantiate", 1, arguments)
        };
        return c = this.each(function() {
            if (d && "string" == typeof d[0]) {
                var c = a.MixItUp.prototype._instances[this.id];
                if ("isLoaded" === d[0])
                    e.push(c?!0 : !1);
                else {
                    var g = c[d[0]](d[1], d[2], d[3]);
                    g !== b && e.push(g)
                }
            } else
                f(this, d[0])
        }), e.length ? e.length > 1 ? e : e[0] : c
    }, a.fn.removeStyle = function(c, d) {
        return d = d ? d : "", this.each(function() {
            for (var e = this, f = c.split(" "), g = 0; g < f.length; g++)
                for (var h = 0; 4 > h; h++) {
                    switch (h) {
                    case 0:
                        var i = f[g];
                        break;
                    case 1:
                        var i = a.MixItUp.prototype._helpers._camelCase(i);
                        break;
                    case 2:
                        var i = d + f[g];
                        break;
                    case 3:
                        var i = a.MixItUp.prototype._helpers._camelCase(d + f[g])
                    }
                    if (e.style[i] !== b && "unknown" != typeof e.style[i] && e.style[i].length > 0 && (e.style[i] = ""), !d && 1 === h)
                        break
                }
            e.attributes && e.attributes.style && e.attributes.style !== b && "" === e.attributes.style.value && e.attributes.removeNamedItem("style")
        })
    }
}(jQuery);;
!function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : e.scrollReveal = t()
}(this, function() {
    return window.scrollReveal = function(e) {
        "use strict";
        function t(t) {
            return r = this, r.elems = {}, r.serial = 1, r.blocked=!1, r.config = o(r.defaults, t), r.isMobile()&&!r.config.mobile ||!r.isSupported() ? void r.destroy() : (r.config.viewport === e.document.documentElement ? (e.addEventListener("scroll", a, !1), e.addEventListener("resize", a, !1)) : r.config.viewport.addEventListener("scroll", a, !1), void r.init(!0))
        }
        var i, o, a, r;
        return t.prototype = {
            defaults: {
                enter: "bottom",
                move: "8px",
                over: "0.6s",
                wait: "0s",
                easing: "ease",
                scale: {
                    direction: "up",
                    power: "5%"
                },
                rotate: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                opacity: 0,
                mobile: !1,
                reset: !1,
                viewport: e.document.documentElement,
                delay: "once",
                vFactor: .6,
                complete: function() {}
            },
            init: function(e) {
                var t, i, o;
                o = Array.prototype.slice.call(r.config.viewport.querySelectorAll("[data-sr]")), o.forEach(function(e) {
                    t = r.serial++, i = r.elems[t] = {
                        domEl: e
                    }, i.config = r.configFactory(i), i.styles = r.styleFactory(i), i.seen=!1, e.removeAttribute("data-sr"), e.setAttribute("style", i.styles.inline + i.styles.initial)
                }), r.scrolled = r.scrollY(), r.animate(e)
            },
            animate: function(e) {
                function t(e) {
                    var t = r.elems[e];
                    setTimeout(function() {
                        t.domEl.setAttribute("style", t.styles.inline), t.config.complete(t.domEl), delete r.elems[e]
                    }, t.styles.duration)
                }
                var i, o, a;
                for (i in r.elems)
                    r.elems.hasOwnProperty(i) && (o = r.elems[i], a = r.isElemInViewport(o), a ? ("always" === r.config.delay || "onload" === r.config.delay && e || "once" === r.config.delay&&!o.seen ? o.domEl.setAttribute("style", o.styles.inline + o.styles.target + o.styles.transition) : o.domEl.setAttribute("style", o.styles.inline + o.styles.target + o.styles.reset), o.seen=!0, o.config.reset || o.animating || (o.animating=!0, t(i))) : !a && o.config.reset && o.domEl.setAttribute("style", o.styles.inline + o.styles.initial + o.styles.reset));
                r.blocked=!1
            },
            configFactory: function(e) {
                var t = {}, i = {}, a = e.domEl.getAttribute("data-sr").split(/[, ]+/);
                return a.forEach(function(e, i) {
                    switch (e) {
                    case"enter":
                        t.enter = a[i + 1];
                        break;
                    case"wait":
                        t.wait = a[i + 1];
                        break;
                    case"move":
                        t.move = a[i + 1];
                        break;
                    case"ease":
                        t.move = a[i + 1], t.ease = "ease";
                        break;
                    case"ease-in":
                        if ("up" == a[i + 1] || "down" == a[i + 1]) {
                            t.scale.direction = a[i + 1], t.scale.power = a[i + 2], t.easing = "ease-in";
                            break
                        }
                        t.move = a[i + 1], t.easing = "ease-in";
                        break;
                    case"ease-in-out":
                        if ("up" == a[i + 1] || "down" == a[i + 1]) {
                            t.scale.direction = a[i + 1], t.scale.power = a[i + 2], t.easing = "ease-in-out";
                            break
                        }
                        t.move = a[i + 1], t.easing = "ease-in-out";
                        break;
                    case"ease-out":
                        if ("up" == a[i + 1] || "down" == a[i + 1]) {
                            t.scale.direction = a[i + 1], t.scale.power = a[i + 2], t.easing = "ease-out";
                            break
                        }
                        t.move = a[i + 1], t.easing = "ease-out";
                        break;
                    case"hustle":
                        if ("up" == a[i + 1] || "down" == a[i + 1]) {
                            t.scale.direction = a[i + 1], t.scale.power = a[i + 2], t.easing = "cubic-bezier( 0.6, 0.2, 0.1, 1 )";
                            break
                        }
                        t.move = a[i + 1], t.easing = "cubic-bezier( 0.6, 0.2, 0.1, 1 )";
                        break;
                    case"over":
                        t.over = a[i + 1];
                        break;
                    case"flip":
                    case"pitch":
                        t.rotate = t.rotate || {}, t.rotate.x = a[i + 1];
                        break;
                    case"spin":
                    case"yaw":
                        t.rotate = t.rotate || {}, t.rotate.y = a[i + 1];
                        break;
                    case"roll":
                        t.rotate = t.rotate || {}, t.rotate.z = a[i + 1];
                        break;
                    case"reset":
                        t.reset = "no" == a[i - 1]?!1 : !0;
                        break;
                    case"scale":
                        if (t.scale = {}, "up" == a[i + 1] || "down" == a[i + 1]) {
                            t.scale.direction = a[i + 1], t.scale.power = a[i + 2];
                            break
                        }
                        t.scale.power = a[i + 1];
                        break;
                    case"vFactor":
                    case"vF":
                        t.vFactor = a[i + 1];
                        break;
                    case"opacity":
                        t.opacity = a[i + 1];
                        break;
                    default:
                        return
                    }
                }), i = o(i, r.config), i = o(i, t), "top" === i.enter || "bottom" === i.enter ? i.axis = "Y" : ("left" === i.enter || "right" === i.enter) && (i.axis = "X"), ("top" === i.enter || "left" === i.enter) && (i.move = "-" + i.move), i
            },
            styleFactory: function(e) {
                function t() {
                    0 !== parseInt(s.move) && (o += " translate" + s.axis + "(" + s.move + ")", r += " translate" + s.axis + "(0)"), 0 !== parseInt(s.scale.power) && ("up" === s.scale.direction ? s.scale.value = 1 - .01 * parseFloat(s.scale.power) : "down" === s.scale.direction && (s.scale.value = 1 + .01 * parseFloat(s.scale.power)), o += " scale(" + s.scale.value + ")", r += " scale(1)"), s.rotate.x && (o += " rotateX(" + s.rotate.x + ")", r += " rotateX(0)"), s.rotate.y && (o += " rotateY(" + s.rotate.y + ")", r += " rotateY(0)"), s.rotate.z && (o += " rotateZ(" + s.rotate.z + ")", r += " rotateZ(0)"), o += "; opacity: " + s.opacity + "; ", r += "; opacity: 1; "
                }
                var i, o, a, r, n, s = e.config, c = 1e3 * (parseFloat(s.over) + parseFloat(s.wait));
                return i = e.domEl.getAttribute("style") ? e.domEl.getAttribute("style") + "; visibility: visible; " : "visibility: visible; ", n = "-webkit-transition: -webkit-transform " + s.over + " " + s.easing + " " + s.wait + ", opacity " + s.over + " " + s.easing + " " + s.wait + "; transition: transform " + s.over + " " + s.easing + " " + s.wait + ", opacity " + s.over + " " + s.easing + " " + s.wait + "; -webkit-perspective: 1000;-webkit-backface-visibility: hidden;", a = "-webkit-transition: -webkit-transform " + s.over + " " + s.easing + " 0s, opacity " + s.over + " " + s.easing + " 0s; transition: transform " + s.over + " " + s.easing + " 0s, opacity " + s.over + " " + s.easing + " 0s; -webkit-perspective: 1000; -webkit-backface-visibility: hidden; ", o = "transform:", r = "transform:", t(), o += "-webkit-transform:", r += "-webkit-transform:", t(), {
                    transition: n,
                    initial: o,
                    target: r,
                    reset: a,
                    inline: i,
                    duration: c
                }
            },
            getViewportH: function() {
                var t = r.config.viewport.clientHeight, i = e.innerHeight;
                return r.config.viewport === e.document.documentElement && i > t ? i : t
            },
            scrollY: function() {
                return r.config.viewport === e.document.documentElement ? e.pageYOffset : r.config.viewport.scrollTop + r.config.viewport.offsetTop
            },
            getOffset: function(e) {
                var t = 0, i = 0;
                do
                    isNaN(e.offsetTop) || (t += e.offsetTop), isNaN(e.offsetLeft) || (i += e.offsetLeft);
                while (e = e.offsetParent);
                return {
                    top: t,
                    left: i
                }
            },
            isElemInViewport: function(t) {
                function i() {
                    var e = n + a * c, t = s - a * c, i = r.scrolled + r.getViewportH(), o = r.scrolled;
                    return i > e && t > o
                }
                function o() {
                    var i = t.domEl, o = i.currentStyle || e.getComputedStyle(i, null);
                    return "fixed" === o.position
                }
                var a = t.domEl.offsetHeight, n = r.getOffset(t.domEl).top, s = n + a, c = t.config.vFactor || 0;
                return i() || o()
            },
            isMobile: function() {
                var t = navigator.userAgent || navigator.vendor || e.opera;
                return /(ipad|playbook|silk|android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))?!0 : !1
            },
            isSupported: function() {
                for (var e = document.createElement("sensor"), t = "Webkit,Moz,O,".split(","), i = ("transition " + t.join("transition,")).split(","), o = 0; o < i.length; o++)
                    if (""===!e.style[i[o]])
                        return !1;
                return !0
            },
            destroy: function() {
                var e = r.config.viewport, t = Array.prototype.slice.call(e.querySelectorAll("[data-sr]"));
                t.forEach(function(e) {
                    e.removeAttribute("data-sr")
                })
            }
        }, a = function() {
            r.blocked || (r.blocked=!0, r.scrolled = r.scrollY(), i(function() {
                r.animate()
            }))
        }, o = function(e, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (e[i] = t[i]);
            return e
        }, i = function() {
            return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || function(t) {
                e.setTimeout(t, 1e3 / 60)
            }
        }(), t
    }(window), scrollReveal
});;
(function ($, Drupal) {

    Drupal.behaviors.ninghao = {
        attach: function (context, settings) {
            $(document).on("load", function () {
                console.log('load');
            });
            if (context == document) {
                // Scroll
                // $('a[href^="#"]').on('click', function (e) {
                //     e.preventDefault();
                //     var target = this.hash;
                //     var $target = $(target);
                //
                //     $('html, body').stop().animate({
                //         'scrollTop': $target.offset().top - 70
                //     }, 600, 'swing', function () {
                //         window.location.hash = target;
                //     });
                // });

                // Search Widget
                var searchFilter = $("#edit-type").val();
                $("#search-widget li.filter").removeClass("active");
                $("#search-widget li.filter." + searchFilter).addClass("active");

                var searchSort = $("#edit-sort-by").val();
                $("#search-widget li.sort").removeClass("active");
                $("#search-widget li.sort." + searchSort).addClass("active");

                $("#search-widget a").click(function () {
                    var filter = $(this).data("filter");
                    var sort = $(this).data("sort");
                    if (filter) {
                        $("#edit-type").val(filter).parents("form").submit();
                    } else {
                        $("#edit-sort-by").val(sort).parents("form").submit();
                    }
                });

                // Player controls
                $('.player > .flag-wrapper').prependTo('.player-controls-left');
                // $('.player > .header').appendTo('.player-controls > .player-status');
                $('.player > .statistics').appendTo('.player-controls > .player-status');

                // Video background
                $(".front .video-bg").vide({
                    mp4: '',
                    poster: ''
                }, {
                    posterType: "jpg"
                });

                $(".node-type-guide .video-bg").vide({
                    mp4: '',
                    poster: ''
                }, {
                    posterType: "jpg"
                });

                $(".node-type-video .video-bg").vide({
                    mp4: '',
                    poster: ''
                }, {
                    posterType: "jpg"
                });

                // Mixitup
                var mixFilter = localStorage.getItem('mixFilter') || 'all',
                mixVideoFilter = localStorage.getItem('mixVideoFilter') || 'all',
                mixSort = localStorage.getItem('mixSort') || 'weight:asc';

                $('.btn-toolbar .filter').click(function () {
                    localStorage.setItem('mixFilter', $(this).attr('data-filter'));
                });

                $('.video-toolbar .filter').click(function () {
                    localStorage.setItem('mixVideoFilter', $(this).attr('data-filter'));
                });

                $('.btn-toolbar .sort').click(function () {
                    localStorage.setItem('mixSort', $(this).attr('data-sort'));
                });

                $('.mixitup').mixItUp({
                    animation: {
                        duration: 599,
                        effects: 'fade translateZ(-360px) stagger(34ms)',
                        easing: 'ease'
                    },
                    load: {
                        sort: mixSort,
                        filter: mixFilter
                    }
                });

                $('.thumbnails').mixItUp({
                    animation: {
                        duration: 599,
                        effects: 'fade translateZ(-360px) stagger(34ms)',
                        easing: 'ease'
                    },
                    load: {
                        sort: 'updated:desc',
                        filter: 'all'
                    }
                });

                $('.video-list').mixItUp({
                    animation: {
                        duration: 300,
                        effects: 'fade translateZ(-360px) stagger(34ms)',
                        easing: 'ease'
                    },
                    selectors: {
                        target: '.item'
                    },
                    layout: {
                        display: 'block'
                    },
                    load: {
                        filter: mixVideoFilter
                    }
                });

                // Affix
                var $window = $(window);
                setTimeout(function () {
                    $('#sidebar').affix({
                        offset: {
                            top: function () {
                                var currentUrl = location.pathname,
                                key = '';
                                if (new RegExp('\\b' + key + '\\b').test(currentUrl)) {
                                    return 530;
                                } else {
                                    return $window.width() <= 1200 ? 660 : 800;
                                }
                            },
                            bottom: 300
                        }
                    })
                }, 100)
                // ScrollReveal.js
                var config = {
                    reset: true,
                    delay: 'always',
                    mobile: true,
                }
                window.sr = new scrollReveal(config);

                // Tooltip
                $('.sub-table').tooltip({
                    selector: "[data-toggle=tooltip]"
                });

                $('.flag-wrapper').tooltip({
                    delay: {
                        show: 600,
                        hide: 0
                    },
                    selector: "[data-toggle=tooltip]",
                    placement: 'bottom'
                });

                // Flag
                $(document).on('flagGlobalBeforeLinkUpdate', function (event, data) {

                    if (data.flagName === "complete") {
                        var item = $(".video-list .item").not(".section");
                        if (data.flagStatus == "flagged") {
                            item.addClass("completed");
                        } else {
                            item.removeClass("completed");
                        }
                    }

                    if (data.flagName === "understand" && $(data.link).parents().hasClass('video-list')) {
                        $(data.link).parents(".item").toggleClass("completed");
                    }

                    if (data.flagName === "understand" && $(data.link).parents().hasClass('player')) {
                        $(".video-list .item a.active").parents(".item").toggleClass('completed');
                    }

                });
                // Equal height
                var biggestHeight = 0;
                $('.eh').each(function () {
                    if ($(this).height() > biggestHeight) {
                        biggestHeight = $(this).height();
                    }
                });
                $('.eh').height(biggestHeight);

                // jQuery footer height
                pushtobottom();
                $(window).scroll(pushtobottom).resize(pushtobottom);
                function pushtobottom() {
                    var docHeight = $(document.body).height() - $("#push-to-bottom").height();
                    if (docHeight < $(window).height()) {
                        var diff = $(window).height() - docHeight;
                        if (!$("#push-to-bottom").length > 0) {
                            $("#bottom").before('<div id="push-to-bottom"></div>');
                        }
                        $("#push-to-bottom").height(diff);
                    }
                }

                // Search bar
                $('#edit-key').attr('placeholder', '搜索 ...');

                // iPad
                if ((navigator.userAgent.match(/iPad/i))) {
                    $('body').addClass('ipad')
                };

                // Tab
                $('a[data-toggle="tab"]').on('shown', function () {
                    localStorage.setItem('lastTab', $(this).attr('href'));
                });
                var lastTab = localStorage.getItem('lastTab');
                if (lastTab) {
                    $('a[href=' + lastTab + ']').tab('show');
                }
                $('#tab a').click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                });

                // Headroom
                $("header").headroom({
                    "offset": 50,
                    "tolerance": 5,
                    "classes": {
                        "pinned": "slideInDown",
                        "unpinned": "slideOutUp"
                    }
                });

                // destroy
                $("#header").headroom("destroy");
                报错解决问题
            }
        }
    };
})(jQuery, Drupal);
