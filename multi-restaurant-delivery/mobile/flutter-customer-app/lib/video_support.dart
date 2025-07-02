import 'package:flutter/material.dart';
import 'package:flutter_webrtc/flutter_webrtc.dart';

class VideoSupport extends StatefulWidget {
  final String roomId;
  const VideoSupport({required this.roomId, Key? key}) : super(key: key);
  @override
  State<VideoSupport> createState() => _VideoSupportState();
}

class _VideoSupportState extends State<VideoSupport> {
  RTCVideoRenderer _local = RTCVideoRenderer();
  RTCVideoRenderer _remote = RTCVideoRenderer();
  @override
  void initState() {
    super.initState();
    _local.initialize();
    _remote.initialize();
    // WebRTC & signaling setup omitted for brevity
  }
  @override
  Widget build(BuildContext context) {
    return Row(children: [
      Expanded(child: RTCVideoView(_local)),
      Expanded(child: RTCVideoView(_remote)),
    ]);
  }
  @override
  void dispose() {
    _local.dispose();
    _remote.dispose();
    super.dispose();
  }
}
