from dataclasses import dataclass
from typing import Optional


@dataclass
class GroupsWithoutIDDTO:
    name: str
    data_analytics: Optional[bool] = None
    service_analytics: Optional[bool] = None
    voice_analytics: Optional[bool] = None
    queue_stats: Optional[bool] = None
    voice_stats: Optional[bool] = None
    video: Optional[bool] = None
    smart_access: Optional[bool] = None
    diagrams: Optional[bool] = None


@dataclass
class GroupsDTO:
    id: int
    name: str
    data_analytics: Optional[bool] = None
    service_analytics: Optional[bool] = None
    voice_analytics: Optional[bool] = None
    queue_stats: Optional[bool] = None
    voice_stats: Optional[bool] = None
    video: Optional[bool] = None
    smart_access: Optional[bool] = None
    diagrams: Optional[bool] = None


@dataclass
class UpdateGroupsDTO:
    id: int
    name: Optional[str] = None
    data_analytics: Optional[bool] = None
    service_analytics: Optional[bool] = None
    voice_analytics: Optional[bool] = None
    queue_stats: Optional[bool] = None
    voice_stats: Optional[bool] = None
    video: Optional[bool] = None
    smart_access: Optional[bool] = None
    diagrams: Optional[bool] = None
