<!--
<template>
    <div :class="rand">
        &lt;!&ndash; 盛放缩略图的容器 &ndash;&gt;
        <div :style="previewBoxStyle">
            <img
                    :src="item.src"
                    v-for="(item, i) in list"
                    :key="i"
                    @click="showPreview(i)"
                    :style="thumbImageStyle"
                    :class="rand2+' thumbImg'"
            >
        </div>

        &lt;!&ndash; Root element of PhotoSwipe. Must have class pswp. &ndash;&gt;
        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
            &lt;!&ndash; Background of PhotoSwipe.
            It's a separate element as animating opacity is faster than rgba().&ndash;&gt;
            <div class="pswp__bg"></div>

            &lt;!&ndash; Slides wrapper with overflow:hidden. &ndash;&gt;
            <div class="pswp__scroll-wrap">
                &lt;!&ndash; Container that holds slides.
                PhotoSwipe keeps only 3 of them in the DOM to save memory.
                Don't modify these 3 pswp__item elements, data is added later on.&ndash;&gt;
                <div class="pswp__container" style="position: fixed; left: 0; top: 0;">
                    <div class="pswp__item" ></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item" ></div>
                </div>

                &lt;!&ndash; Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. &ndash;&gt;
                <div class="pswp__ui pswp__ui&#45;&#45;hidden">
                    <div class="pswp__top-bar">
                        &lt;!&ndash; Controls are self-explanatory. Order can be changed. &ndash;&gt;
                        <div class="pswp__counter"></div>

                        <button class="pswp__button pswp__button&#45;&#45;close" title="Close (Esc)"></button>

                        &lt;!&ndash; <button
                          class="pswp__button pswp__button&#45;&#45;share"
                          title="Share"
                        ></button>&ndash;&gt;
                        &lt;!&ndash; <button
                          class="pswp__button pswp__button&#45;&#45;fs"
                          title="Toggle fullscreen"
                        ></button>&ndash;&gt;
                        <button class="pswp__button pswp__button&#45;&#45;zoom" title="Zoom in/out"></button>

                        &lt;!&ndash; Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR &ndash;&gt;
                        &lt;!&ndash; element will get class pswp__preloader&#45;&#45;active when preloader is running &ndash;&gt;
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                                <div class="pswp__preloader__cut">
                                    <div class="pswp__preloader__donut"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pswp__share-modal pswp__share-modal&#45;&#45;hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div>
                    </div>

                    <button class="pswp__button pswp__button&#45;&#45;arrow&#45;&#45;left" title="Previous (arrow left)"></button>
                    <button class="pswp__button pswp__button&#45;&#45;arrow&#45;&#45;right" title="Next (arrow right)"></button>

                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "photoswipe/dist/photoswipe.css";
    import "photoswipe/dist/default-skin/default-skin.css";
    // Core JS file
    import PhotoSwipe from "photoswipe/dist/photoswipe.min.js";
    // UI JS file
    import PhotoSwipeUIDefault from "photoswipe/dist/photoswipe-ui-default.min.js";

    export default {
        name: "Vue2Preview",
        data() {
            return {
                rand: "rand" + parseInt(Math.random() * 10000),
                rand2: "rand2" + parseInt(Math.random() * 10000),
            };
        },
        created() {

        },
        props: {
            // 需要进行预览的图片
            list: {
                // 数据类型
                type: Array,
                required: true,
                default: function () {
                    return [
                    ];
                }
            },
            // 默认缩略图的样式
            thumbImageStyle: {
                type: Object,
                default: function () {
                    return {
                        width: "100px",
                        height: "100px",
                        margin: "10px",
                        cursor: "pointer"
                    };
                }
            },
            // 默认缩略图容器的样式
            previewBoxStyle: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            // 是否允许单击关闭
            tapToClose: {
                type: Boolean,
                default: function () {
                    return false;
                }
            }
        },
        methods: {
            // 点击图片显示缩略图
            showPreview(i) {
                var pswpElement = document.querySelectorAll("." + this.rand + " .pswp")[0];
                // define options (if needed)
                let that = this;
                var options = {
                    // 默认展示第几张图片
                    index: i, // start at first slide
                    // 点击关闭
                    tapToClose: this.tapToClose,
                    // 实现打开缩略图的动画效果
                    getThumbBoundsFn: function (index) {
                        // 获取页面上对应点击的图片
                        // console.log(index)
                        var thumbnail = document.querySelectorAll("." + that.rand2)[index];
                        // thumbImg bug
                        // var thumbnail = document.querySelectorAll(" .thumbImg")[index];
                        // 获取到页面已经滚动的距离
                        var pageYScroll =
                            window.pageYOffset || document.documentElement.scrollTop;
                        // optionally get horizontal scroll

                        // get position of element relative to viewport
                        var rect = thumbnail.getBoundingClientRect();

                        // w = width
                        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
                    }
                };

                // Initializes and opens PhotoSwipe
                var gallery = new PhotoSwipe(
                    pswpElement,
                    PhotoSwipeUIDefault,
                    this.list,
                    options
                );
                gallery.init();

                // 即将关闭
                gallery.listen("close", () => {
                    this.$emit("close");
                });

                // Gallery unbinds events
                // (triggers before closing animation)
                gallery.listen("unbindEvents", () => {
                    // console.log('unbindEvents')
                });

                // 关闭之后清理资源
                gallery.listen("destroy", () => {
                    this.$emit("destroy");
                });
            },
        }
    };
</script>
-->
