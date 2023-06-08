<template>
	<view class="mineBox">
		<view>婚礼请柬首页</view>
		<view>婚礼请柬时间地点人物</view>
		<view>新娘</view>
		<view>新郎</view>
		<view>流程安排</view>
		<view>婚纱1</view>
		<view>婚纱2</view>
		<view class="playAudio" @click="playAudio">{{isPlaying?'暂停':'开始'}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//判断音乐是否正在播放中
				isPlaying: true,
				bgAudioManager: {
					title: null,
					coverImgUrl: null,
					src: null,
					title: null,
				}
			}
		},
		created() {
			this.audioInit()
		},
	
		methods: {
			audioInit() {
				this.bgAudioManager = uni.getBackgroundAudioManager();
				this.bgAudioManager.title = 'XX和XY的婚礼';
				this.bgAudioManager.coverImgUrl =
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F28%2F20200628042624_vdrgm.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1686908461&t=20bd2e4047dbe6027af762d44ea442fa';
				this.bgAudioManager.src =
					'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
				this.bgAudioManager.onEnded(function(e) {
					console.log('自然播放完成')
					this.bgAudioManager = uni.getBackgroundAudioManager();
					this.bgAudioManager.title = 'XX和XY的婚礼';
					this.bgAudioManager.coverImgUrl =
						'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F28%2F20200628042624_vdrgm.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1686908461&t=20bd2e4047dbe6027af762d44ea442fa';
					this.bgAudioManager.src =
						'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
					this.bgAudioManager.play()
				});
			},
			playAudio() {
				if (this.isPlaying) {
					this.bgAudioManager.pause()
					this.isPlaying = false
				} else {
					this.bgAudioManager.play()
					this.isPlaying = true
				}
			},
			onLoadMethod() {

			}
		}
	}
</script>

<style scoped lang="scss">
	.mineBox {
		width: 100%;
		position: relative;
		padding-bottom: 140rpx;

		.playAudio {
			width: 100rpx;
			height: 100rpx;
			position: fixed;
			bottom: 180rpx;
			right: 20rpx;
			background-color: #FF6666;
			color: #FFFFCC;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>