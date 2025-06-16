"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = Form;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const Button_1 = require("./Button");
const Input_1 = require("./Input");
function Form({ schema, onSubmit, children, submitLabel = 'Submit', className = '', }) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(schema),
    });
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: `space-y-4 ${className}`, children: [react_1.default.Children.map(children, (child) => {
                var _a;
                if (!react_1.default.isValidElement(child))
                    return child;
                if (child.type === Input_1.Input) {
                    const { name } = child.props;
                    return react_1.default.cloneElement(child, {
                        ...child.props,
                        error: (_a = errors[name]) === null || _a === void 0 ? void 0 : _a.message,
                        register: register(name),
                    });
                }
                return child;
            }), (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "submit", disabled: isSubmitting, className: "w-full", children: isSubmitting ? 'Submitting...' : submitLabel })] }));
}
