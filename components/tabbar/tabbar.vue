<template>
	<view class='tabbarBox'>
		<view class="fillBox"></view>
		<view class="footer" :style="'background-color: '+bgColor+';'">
			<view v-for="(item,index) in tabBarList" :key="index" class="item" @click="NavigatorPage(item,index)">
				<view v-if="index!=1">
					<!-- #ifdef H5 -->
					<img class="image" :src="selectedBar == index ? item.selectedIconPath : item.iconPath"></img>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image class="image" :src="selectedBar == index ? item.selectedIconPath : item.iconPath"></image>
					<!-- #endif -->
					<view v-if="item.text" :style="selectedBar == index ?  'color:'+selectedColor+';' : 'color:'+color+';'">
						{{item.text}}
					</view>
				</view>
				<view class="centerBar animate__animated  animate__pulse  animate__infinite infinite" v-if="index==1">
					<!-- #ifdef H5 -->
					<img class="image" :src="selectedBar == index ? item.selectedIconPath : item.iconPath"></img>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image class="image" :src="selectedBar == index ? item.selectedIconPath : item.iconPath"></image>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		props: {
			//背景颜色
			bgColor: {
				type: String,
				default: 'transparent'
			},
			//未激活字体颜色
			color: {
				type: String,
				default: '#cccccc'
			},
			//激活字体颜色
			selectedColor: {
				type: String,
				default: '#3864F7'
			},
			selectedBar: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				tabBarList: [{
						"pagePath": "/pages/home/home",
						"iconPath": "../../static/tabbar/index.png",
						"selectedIconPath": "../../static/tabbar/index_active.png",
						"text": "婚礼安排"
					},
					{
						"pagePath": "/pages/mine/mine",
						"iconPath": "../../static/tabbar/commission.png",
						"selectedIconPath": "../../static/tabbar/commission_active.png",
					},
					{
						"pagePath": "/pages/photo/photo",
						"iconPath": "../../static/tabbar/mine.png",
						"selectedIconPath": "../../static/tabbar/mine_active.png",
						"text": "婚纱照片"
					}
				]
			};
		},
		methods: {
			NavigatorPage(item, index) {
				// this.selectedBar = index
				this.$emit('changTabBar', index)
				// uni.switchTab({
				// 	url: item.pagePath
				// })
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tabbarBox {
		width: 100%;


		.fillBox {
			padding-top: 140rpx;
		}

		.footer {
			position: fixed;
			bottom: 0;
			height: 140rpx;
			width: inherit;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: space-around;
			background-image: url("@/static/tabbar/tabbarBg.png");
			background-size: 100% 100%;
			background-repeat: no-repeat;
			.item {
				font-size: 18rpx;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 20%;
				// padding: 0 20rpx;
				margin: 0 20rpx;

				.centerBar {
					position: absolute;
					top: -135rpx;
					.image {
						width: 112rpx;
						height: 112rpx;
					}
				}

				.image {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}
	}
</style>