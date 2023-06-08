<template>
	<view class="pageBox">
		<view v-if="currentIndex==0" :style="{display: currentIndex === 0 ? '' : 'none'}">
			<scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top>
				<Home ref="home"></Home>
			</scroll-view>
		</view>
		<view v-if="currentIndex==1" :style="{display: currentIndex === 1 ? '' : 'none'}">
			<scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top>
				<Mine ref="mine"></Mine>
			</scroll-view>
		</view>
		<view v-if="currentIndex==2" :style="{display: currentIndex === 2 ? '' : 'none'}">
			<scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top>
				<Photo ref="phont"></Photo>
			</scroll-view>
		</view>
		<tabbar @changTabBar='changTabBar' :selectedBar='selectedBar'></tabbar>
	</view>
</template>

<script>
	import Home from '@/pages/home/home.vue'
	import Mine from '@/pages/mine/mine.vue'
	import Photo from '@/pages/photo/photo.vue'
	export default {
		components: {
			Home,
			Mine,
			Photo,
		},
		//分享到朋友圈
		onShareTimeline() {
			return {
				title: 'XX和XY的婚礼',
				path: "pages/index/index",
				imageUrl: "../../static/logo.png",
			};
		},
		//发送给朋友
		onShareAppMessage() {
			return {
				title: 'XX和XY的婚礼',
				path: "pages/index/index",
				imageUrl: "../../static/logo.png",
			};
		},
		data() {
			return {
				//选中页面
				currentIndex: 0,
				//选中底部导航栏
				selectedBar: 0
			}
		},
		methods: {
			changTabBar(index) {
				this.currentIndex = index
				this.selectedBar = index
				this.$nextTick(function() {
					if (this.currentIndex == 0) {
						this.$refs['home'].onLoadMethod()
					} else if (this.currentIndex == 1) {
						this.$refs['mine'].onLoadMethod()
					} else if (this.currentIndex == 2) {
						this.$refs['phont'].onLoadMethod()
					}
				})
			},
		}
	}
</script>

<style>
</style>