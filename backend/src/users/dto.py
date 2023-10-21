from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from groups.dto import GroupsDTO


@dataclass
class UsersDTO:
    id: int
    email: str
    created: datetime
    group: GroupsDTO
    admin: bool


@dataclass
class CreateUserDTO:
    email: str
    group_id: Optional[int] = None
    admin: Optional[bool] = None


@dataclass
class UpdateUserDTO:
    user_id: int
    email: Optional[str] = None
    group_id: Optional[int] = None
    admin: Optional[bool] = None
