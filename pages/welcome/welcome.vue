<template>
	<view class="content">
		<image class="bg" src="../../static/bg.png" mode=""></image>
		<view class="going">
			<image class="image animate__animated animate__pulse animate__infinite infinite"
				src="../../static/going.png" mode=""></image>
			<view class="title" @click="navigatorPage">点击进入</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			navigatorPage() {
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>
<style>
	page {
		width: 100%;
		height: 100%;
	}
</style>

<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100%;

		.bg {
			width: 100%;
			height: 100%;
		}
	}

	.going {
		width: 400rpx;
		height: 100rpx;
		position: absolute;
		bottom: 200rpx;
		left: 50%;
		transform: translate(-50%);
		display: flex;
		align-items: center;
		justify-content: center;

		.image {
			position: absolute;
			width: 400rpx;
			height: 100rpx;
			z-index: 100;
		}

		.title {
			position: absolute;
			color: #fff;
			left: 50%;
			transform: translate(-50%);
			z-index: 200;
		}
	}
</style>