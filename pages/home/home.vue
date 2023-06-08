<template>
	<view>
		<view class="remainingTime" v-if="remainingTime">
			{{remainingTime}}
		</view>
		<view class="calendar">
			<calendar :markDays="markDays" :weekstart='1'>
			</calendar>
		</view>
		<view class="map">
			<map style="width: 100%; height: 400rpx;" :show-location='true' :latitude="latitude" :longitude="longitude"
				:enable-zoom="false" :enable-scroll="false" :markers='markers'>
			</map>
		</view>
		<view class="location" @click="chooseLocation">导航</view>

		<view class="arrangeList">
			<view class="arrangeItem" v-for="(item,index) in arrangeList" :key="index">
				<view class="name">{{item.name}}</view>
				<view class="time">{{item.time}}</view>
				<view class="address">{{item.address}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//安排列表
				arrangeList: [{
					name: '随礼入席',
					time: '2023-10-20 10:30:00',
					address: 'XX大酒店'
				}, {
					name: '婚宴仪式',
					time: '2023-10-20 12:00:00',
					address: 'XX大酒店'
				}, {
					name: '晚宴仪式',
					time: '2023-10-20 20:30:00',
					address: 'XX小区'
				}, {
					name: '晚宴礼花',
					time: '2023-10-20 22:00:00',
					address: 'XX小区'
				}],
				markers: [{
					id: 89898989,
					latitude: 34.777544, //纬度
					longitude: 116.111809, //经’
					name: '单州大酒店',
					width: 20,
					height: 30,
				}],
				latitude: 34.777544, //纬度
				longitude: 116.111809, //经度
				//开始时间
				weddingTime: '2023-10-20 12:00:00',
				//剩余时间
				remainingTime: null,
				// 日历数据
				curDate: '',
				markDays: null
			}
		},
		created() {
			let that = this
			if (that.weddingTime) {
				that.markDays = that.weddingTime.split(' ')[0]
			}
			setInterval(function() {
				that.getRemainingTime()
			}, 1000)
		},
		methods: {
			chooseLocation(e) { //打开地图选择位置
				let that = this
				uni.chooseLocation({
					latitude: that.latitude,
					longitude: that.longitude,
					success: res => {
						uni.getLocation({
							type: 'gcj02',
							altitude: true,
							geocode: true,
							success: function(res) {

							}
						});
					}
				});
			},
			getRemainingTime() {
				let endTime = new Date(this.weddingTime)
				let nowTime = new Date().getTime()
				var second = Math.floor((endTime - nowTime) / 1000); //未来时间距离现在的秒数
				if (second > 0) {
					var day = Math.floor(second / 86400); //整数部分代表的是天；一天有24*60*60=86400秒 ；
					second = second % 86400; //余数代表剩下的秒数；
					var hour = Math.floor(second / 3600); //整数部分代表小时；
					second %= 3600; //余数代表 剩下的秒数；
					var minute = Math.floor(second / 60);
					second %= 60;
					this.remainingTime = this.tow(day) + "天" + this.tow(hour) + "时" + this.tow(minute) + "分" + this.tow(
						second) + "秒"
				} else {
					this.remainingTime = "00天00时00分00秒"
				}
			},
			tow(n) {
				return n >= 0 && n < 10 ? '0' + n : '' + n;
			},
			onLoadMethod() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.remainingTime{
		margin-top: 100rpx;
		text-align: center;
		font-size: 50rpx;
	}
	.calendar {
		width: 90%;
		margin: 30rpx auto;
	}

	.map {
		width: 90%;
		height: 400rpx;
		margin: 30rpx auto;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.location {
		border-radius: 16rpx;
		margin: 20rpx auto;
		width: 200rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #99CC33;
		color: #fff;
	}
	.arrangeList{
		width: 90%;
		margin: 0 auto;
		.arrangeItem{
			height: 150rpx;
			background-color: #FF6666;
			color:#FFFFCC ;
			border-radius: 16rpx;
			padding: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin: 10rpx 0;
		}
	}
</style>