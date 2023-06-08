<template>
	<view class="content">
		<view class="app-page">
			<!-- 左侧数据 -->
			<view class="left-list margin-left-sm flex-column">
				<view class="post-item radius-sm flex-column align-center bg-white showAni"
					v-for="(postItem, index) in leftList" :key="index" :id="index">
					<image class="radius-sm" @load="imageLoad" :src="postItem" mode="widthFix">
					</image>
				</view>
			</view>
			<!-- 右侧数据 -->
			<view class="right-list margin-left-sm flex-column">
				<view class="post-item radius-sm flex-column align-center bg-white showAni"
					v-for="(postItem, index) in rightList" :key="index" :id="index">
					<image class="radius-sm" @load="imageLoad" :src="postItem" mode="widthFix">
					</image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 左侧数据列表
				leftList: [],
				// 右侧数据列表
				rightList: [],
				// 左侧高度
				leftHeight: 0,
				// 右侧高度
				rightHeight: 0,
				// 记录最新一个元素的下标
				dataCount: 0,
				imageList: ['https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=2763645735,2016465681&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=3911840071,2534614245&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=2763645735,2016465681&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=3911840071,2534614245&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=2763645735,2016465681&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=3911840071,2534614245&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=2763645735,2016465681&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=3911840071,2534614245&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=2763645735,2016465681&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=3911840071,2534614245&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=2763645735,2016465681&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=3911840071,2534614245&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
				],
			};
		},
		created() {
			this.waterFall()
		},
		methods: {
			onLoadMethod() {
				this.waterFall()
			},
			// 图片加载完成
			imageLoad: function(e) {
				// 获取图片高度
				let imgHeight = e.detail.height;
				// 若此张图为加载的第一项则直接将高度加载左边
				if (this.dataCount == 0) {
					this.leftHeight += imgHeight;
					this.dataCount++;
				}
				// 防止超出最大数据长度
				if (this.dataCount < this.imageList.length) {
					// 判断左右高度 下一个元素插入到高度较小的一侧 并更新那一侧的高度 同时最新元素的下标前进一位
					if (this.leftHeight > this.rightHeight) {
						this.rightList.push(this.imageList[this.dataCount]);
						this.rightHeight += imgHeight;
						this.dataCount++;
					} else {
						this.leftList.push(this.imageList[this.dataCount]);
						this.leftHeight += imgHeight;
						this.dataCount++;
					}
				}
			},
			// 瀑布流生成开始
			waterFall: function() {
				// 默认第一个元素放置在左侧
				this.leftList.push(this.imageList[0]);
			},
		}
	};
</script>
<style>
	page {
		width: 100%;
		height: 100%;
		background-color: #F6F6F6;
	}
</style>
<style lang="scss">
	.app-page {
		width: 100%;
		display: flex;
		justify-content: space-between;

		.left-list,
		.right-list {
			width: 48%;
			height: auto;

			.post-item {
				height: auto;
				margin-top: 20rpx;
				padding: 0 10rpx;
				border-radius: 10rpx;
				overflow: hidden;

				image {
					width: 100%;
					max-height: 600rpx;
					border-radius: 10rpx;
					overflow: hidden;
				}
			}

			.showAni {
				animation: show .4s linear 1 forwards;
			}

			@keyframes show {
				0% {
					transform: translateY(10rpx);
					opacity: 0.5;
				}

				100% {
					transform: translateY(0);
					opacity: 1;
				}
			}
		}
	}
</style>