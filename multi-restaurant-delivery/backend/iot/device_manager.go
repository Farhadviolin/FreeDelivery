func (s *Server) PublishFirmware(ctx context.Context, req *pb.FirmwareRequest) (*pb.Ack, error) {
  topic := fmt.Sprintf("devices/%s/ota", req.DeviceId)
  token := s.mqtt.Publish(topic, 1, false, req.Binary)
  token.Wait()
  return &pb.Ack{Success: token.Error() == nil}, nil
}
