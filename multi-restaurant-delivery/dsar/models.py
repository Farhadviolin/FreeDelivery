from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class DSARRequest(Base):
    __tablename__ = 'dsar_requests'
    id = Column(Integer, primary_key=True)
    subject_id = Column(Text, nullable=False)
    request_type = Column(Text, nullable=False)
    status = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP)

class DSARAudit(Base):
    __tablename__ = 'dsar_audit'
    id = Column(Integer, primary_key=True)
    request_id = Column(Integer, ForeignKey('dsar_requests.id'))
    action = Column(Text)
    performed_at = Column(TIMESTAMP)
    details = Column(JSON)
