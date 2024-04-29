"""Merge multiple heads

Revision ID: 5defe8dae4a6
Revises: 1ffbf36ab43b, 4203509bf192
Create Date: 2024-04-28 21:52:14.081196

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5defe8dae4a6'
down_revision = ('1ffbf36ab43b', '4203509bf192')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
