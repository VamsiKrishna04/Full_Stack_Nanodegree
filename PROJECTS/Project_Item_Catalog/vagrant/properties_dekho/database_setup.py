import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    email = Column(String(250), nullable=False)
    picture = Column(String(250))


class Project(Base):
    __tablename__ = 'project'
    project_name = Column(String(80), nullable=False)
    project_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'projectName': self.project_name,
            'projectId': self.project_id,
        }


class Property(Base):
    __tablename__ = 'property'
    property_name = Column(String(80), nullable=False)
    property_id = Column(Integer, primary_key=True)
    cost = Column(String(20))
    facilities = Column(String(250))
    property_type = Column(String(80))
    project_id = Column(Integer, ForeignKey('project.project_id'))
    project = relationship(Project)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)

# We added this serialize function to be able to send JSON objects in a
# serializable format
    @property
    def serialize(self):

        return {
            'propertyName': self.property_name,
            'propertyId': self.property_id,
            'cost': self.cost,
            'facilities': self.facilities,
            'propertyType': self.property_type,
            'projectId': self.project_id,
        }


engine = create_engine('sqlite:///propertieswithusers.db')

Base.metadata.create_all(engine)
