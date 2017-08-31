/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const MapInfoUtils = require('../../../../MapStore2/web/client/utils/MapInfoUtils');
const FeatureInfoUtils = require('../../../../MapStore2/web/client/utils/FeatureInfoUtils');
const HTML = require('../../../../MapStore2/web/client/components/I18N/HTML');
const Message = require('../../../../MapStore2/web/client/components/I18N/Message');

const {Alert, Panel, Accordion} = require('react-bootstrap');

const DefaultHeader = require('./DefaultHeader');
const ViewerPage = require('./viewers/ViewerPage');
const AitCharts = require('./viewers/AitCharts');

const DefaultViewer = React.createClass({
    propTypes: {
        format: React.PropTypes.string,
        collapsible: React.PropTypes.bool,
        requests: React.PropTypes.array,
        responses: React.PropTypes.array,
        missingResponses: React.PropTypes.number,
        container: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func]),
        header: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func]),
        headerOptions: React.PropTypes.object,
        validator: React.PropTypes.func,
        viewers: React.PropTypes.object,
        style: React.PropTypes.object,
        containerProps: React.PropTypes.object,
        aitChartsData: React.PropTypes.array
    },
    getInitialState() {
        return {
            index: 0
        };
    },
    getDefaultProps() {
        return {
            format: MapInfoUtils.getDefaultInfoFormatValue(),
            responses: [],
            missingResponses: 0,
            collapsible: false,
            header: DefaultHeader,
            headerOptions: {},
            container: Accordion,
            validator: MapInfoUtils.getValidator,
            viewers: MapInfoUtils.getViewers(),
            style: {
                maxHeight: "500px",
                position: "relative",
                marginBottom: 0
            },
            containerProps: {},
            aitChartsData: []
        };
    },
    componentWillReceiveProps(nextProps) {
        // reset current page on new requests set
        if (nextProps.aitChartsData !== this.props.aitChartsData) {
            this.setState({index: 0});
        }
    },
    shouldComponentUpdate(nextProps, nextState) {
        let refresh = nextProps.aitChartsData !== this.props.aitChartsData || nextProps.missingResponses !== this.props.missingResponses || nextState.index !== this.state.index;
        return refresh;
    },
    renderEmptyLayers(validator) {
        const notEmptyResponses = validator.getValidResponses(this.props.responses).length;
        const invalidResponses = validator.getNoValidResponses(this.props.responses);
        if (this.props.missingResponses === 0 && notEmptyResponses === 0) {
            return null;
        }
        if (invalidResponses.length !== 0) {
            const titles = invalidResponses.map((res) => {
                const {layerMetadata} = res;
                return layerMetadata.title;
            });
            return (
                <Alert bsStyle={"info"}>
                    <Message msgId={"noInfoForLayers"} />
                    <b>{titles.join(', ')}</b>
                </Alert>
            );
        }
        return null;
    },
    renderAitCharts(chartData) {
        return (
            <AitCharts
                chartData={chartData}/>
        );
    },
    renderPage(response) {
        const Viewer = this.props.viewers[this.props.format];
        if (Viewer) {
            return <Viewer response={response} />;
        }
        return null;
    },
    renderPages(responses) {
        // if (this.props.missingResponses === 0 && responses.length === 0) {
        //     return (
        //         <Alert bsStyle={"danger"}>
        //             <h4><HTML msgId="noFeatureInfo"/></h4>
        //         </Alert>
        //     );
        // }

        // return responses.map((res, i) => {
        //     const {response, layerMetadata, format} = res;
        //     const PageHeader = this.props.header;
        //     return (
        //         <Panel
        //             eventKey={i}
        //             key={i}
        //             collapsible={this.props.collapsible}
        //             header={<span><PageHeader
        //                 size={responses.length}
        //                 {...this.props.headerOptions}
        //                 {...layerMetadata}
        //                 index={this.state.index}
        //                 onNext={() => this.next()}
        //                 onPrevious={() => this.previous()}/></span>
        //             }
        //             style={this.props.style}>
        //             {this.renderAitCharts(validAitChartsData)}
        //         </Panel>
        //     );
        // });
        let responses2 = [];
        responses2.push(responses);
        return responses2.map((res, i) => {
            // const {response} = res;
            const PageHeader = this.props.header;
            return (
                <Panel
                    eventKey={i}
                    key={i}
                    collapsible={this.props.collapsible}
                    header={<span><PageHeader
                        size={responses.length}
                        {...this.props.headerOptions}
                        index={this.state.index}
                        onNext={() => this.next()}
                        onPrevious={() => this.previous()}/></span>
                    }
                    style={this.props.style}>
                    {this.renderAitCharts(res)}
                </Panel>
            );
        });
    },
    renderAdditionalInfo() {
        const validator = this.props.validator(this.props.format);
        if (validator) {
            return this.renderEmptyLayers(validator);
        }
    },
    render() {
        const Container = this.props.container;
        // const validator = this.props.validator(this.props.format);
        // const validResponses = validator.getValidResponses(this.props.responses);
        const validAitChartsData = this.props.aitChartsData;
        return (<div>
                <Container {...this.props.containerProps}
                    onChangeIndex={(index) => {this.setState({index}); }}
                    ref="container"
                    index={this.state.index || 0}
                    key={"swiper"}
                    className="swipeable-view">
                    {this.renderPages(validAitChartsData)}
                </Container>
                {this.renderAdditionalInfo()}
            </div>
        );
    },
    next() {
        // this.setState({index: Math.min(this.props.validator(this.props.format).getValidResponses(this.props.responses).length - 1, this.state.index + 1)});
        this.setState({index: Math.min(1 - 1, this.state.index + 1)});
    },
    previous() {
        // this.setState({index: Math.max(0, this.state.index - 1) });
        this.setState({index: Math.max(0, this.state.index - 1) });
    }
});

module.exports = DefaultViewer;
