import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import MenuItem from '../MenuItem';
import { defaultMenuItem } from '../../../utils';

const SubMenuWrapper = styled.div`
  position: absolute;
  top: ${props => props.theme.menuSubLabelHeaders ? '-25px' : '-5px'};
  left: ${props => props.renderSide === 'left' ? '-100%' : '100%'};
  max-width: ${props => props.theme.menuWidth};
  width: 100%;
  background-color: ${props => props.theme.menuBackgroundColor};
  padding: 5px 0px;
  color: ${props => props.theme.menuActiveTextColor};
  z-index: ${props => props.level + 8};
  box-shadow: ${props => props.theme.menuShowBoxShadow ? props.theme.menuBoxShadow : ''};
`;

export const SubMenuLabel = styled.div`
  height: 20px;
  line-height: 20px;
  margin: 0 10px;
  color: ${props => props.theme.menuSubLabelColor};
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: rtl;
  font-size: 1em;
  text-align: left;
`;

class SubMenu extends Component {
  generateMenu = (menu = []) => {
    return menu.map((menuItem, i) => {
      if (menuItem.submenu) {
        // create submenu item
        const windowWidth = window.innerWidth;
        let renderSide = 'right';
        let right = this.props.right + this.props.theme.menuWidth;

        // Render menu to the left if the right side of the
        // current menu is greater than the current window width
        if (right > windowWidth) {
          if (this.props.theme.menuWidth < (this.props.right - this.props.theme.menuWidth)) {
            renderSide = 'left';
            right = this.props.right - this.props.theme.menuWidth;
          } else {
            // check wich side has more space and zero it out to the right or left
            const rightDiff = windowWidth - right;
            const leftDiff = this.props.right - this.props.theme.menuWidth;
            if (rightDiff < leftDiff) {
              // zero out to the right
            }
          }
        }
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            level={this.props.level + 1}
            right={right}
            renderSide={renderSide}
            theme={this.props.theme}
            changeCheckState={this.props.changeCheckState}
            menuItem={{ ...defaultMenuItem, ...menuItem, type: 'submenu' }}
            path={[...this.props.path, i, 'submenu']}
          />
        );
      }

      return (
        <MenuItem
          key={`${i}${menuItem.label}`}
          changeCheckState={this.props.changeCheckState}
          menuItem={{ ...defaultMenuItem, ...menuItem }}
          indx={i}
          path={[...this.props.path]}
        />
      );
    });
  }

  render() {
    const {
      menuItem,
      level,
      renderSide,
      theme,
    } = this.props;

    return (
      <MenuItem
        menuItem={{ ...defaultMenuItem, ...menuItem }}
      >
        <SubMenuWrapper
          level={level}
          renderSide={renderSide}
        >
          {
            theme.menuSubLabelHeaders &&
            <SubMenuLabel>
              {menuItem.label}
            </SubMenuLabel>
          }
          {
            this.generateMenu(menuItem.submenu)
          }
        </SubMenuWrapper>
      </MenuItem>
    );
  }
}

SubMenu.propTypes = {
  menuItem: PropTypes.object,
  level: PropTypes.number,
  renderSide: PropTypes.string,
  changeCheckState: PropTypes.func,
};

SubMenu.defaultProps = {
  menuItem: {},
  level: 1,
  renderSide: 'right',
  changeCheckState: () => {},
};

export default withTheme(SubMenu);
